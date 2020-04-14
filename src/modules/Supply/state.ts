import { U, ActionsUnion, createReducer, fromActions } from "@rxsv/core";
import { map, pluck } from "rxjs/operators";
import { merge } from "rxjs";
import { Lens } from "monocle-ts/es6";
import { indexRecord } from "monocle-ts/es6/Index/Record";
import { UUID } from "@/common/prelude";
import * as R from "fp-ts/es6/Record";
import * as A from "fp-ts/es6/Array";
import { flow, identity } from "fp-ts/es6/function";
import { pipe } from "fp-ts/es6/pipeable";
import * as O from "fp-ts/es6/Option";

import { AppState, AppEffect } from "@/root";

import { Supply, Supplies, Brand, brands, OrderPos } from "../Supply/Supply";

export type SupplyId = UUID;
export type SupplyListId = string;
export type SupplyTypeDescription = string;
export type StoreSupply = { id: SupplyId; supply: Supply };
export type SupplyPayload = { listId: SupplyListId } & StoreSupply;
export type SupplyDescPayload = { listId: SupplyListId; brand: Brand; text: string };
export type SupplyAddIntentPayload = Omit<SupplyPayload, "id">;
export type SupplyRemovalPayload = { id: SupplyId; listId: SupplyListId };
export type UpdateIntendPayload = { positions: OrderPos } & SupplyAddIntentPayload;

type DescMap = Record<Brand, SupplyTypeDescription>;

export const Actions = U.createUnion(
  U.caseOf("ADD_SUPPLY_INTENT")<SupplyAddIntentPayload>(),
  U.caseOf("ADD_SUPPLY")<SupplyPayload>(),
  U.caseOf("UPDATE_SUPPLY_INTENT")<UpdateIntendPayload>(),
  U.caseOf("UPDATE_SUPPLY")<SupplyPayload>(),
  U.caseOf("REMOVE_SUPPLY")<SupplyRemovalPayload>(),
  U.caseOf("MODIFY_SUPPLY_TYPE_DESC")<SupplyDescPayload>(),
  U.caseOf("ADD_SUPPLY_LIST_ID")<SupplyListId>()
);
export type Actions = ActionsUnion<typeof Actions>;

export type State = {
  byId: Record<SupplyId, StoreSupply>;
  byList: Record<SupplyListId, SupplyId[]>;
  descriptions: Record<SupplyListId, DescMap>;
};
export namespace State {
  export const empty = (): State => ({
    byId: {},
    byList: {},
    descriptions: {}
  });
}

export namespace Lenses {
  const supplies = Lens.fromProp<AppState>()("supplies");
  const byId = Lens.fromProp<State>()("byId");
  const byList = Lens.fromProp<State>()("byList");
  const desc = Lens.fromProp<State>()("descriptions");

  const descMapById = flow(indexRecord<DescMap>().index, x => desc.composeOptional(x));
  const descByIdAndBrand = (listId: SupplyListId) => (tag: Brand) =>
    descMapById(listId).composeOptional(indexRecord<SupplyTypeDescription>().index(tag));
  const supplyById = flow(indexRecord<StoreSupply>().index, x => byId.composeOptional(x));

  // TODO: convert functions below to Traversals / Ats / Indexs
  // http://julien-truffaut.github.io/Monocle/examples/university_example.html
  // https://github.com/gcanti/monocle-ts/pull/86/files#diff-8961b15799571485d2c53f6bc4b04631

  const modifyByList = (listId: SupplyListId) => (fn: (a: SupplyId[]) => SupplyId[]) =>
    byList.modify(r =>
      pipe(
        r,
        R.modifyAt(listId, fn),
        O.getOrElse(() => r)
      )
    );

  const suppliesByListIdAndBrand = (listId: SupplyListId) => (brand: Brand) => (state: State): StoreSupply[] =>
    pipe(
      byList.get(state),
      r => R.lookup(listId, r),
      O.map(
        flow(
          A.reduce<UUID, StoreSupply[]>([], (acc, supplyId) =>
            pipe(
              R.lookup(supplyId, byId.get(state)),
              O.map(s => A.snoc(acc, s)),
              O.getOrElse(() => acc)
            )
          ),
          A.filter(a => a.supply.tag === brand)
        )
      ),
      O.getOrElse<StoreSupply[]>(() => [])
    );

  export const suppliesPerTypeByListId = (listId: SupplyListId) => (appState: AppState): Supplies => {
    const state = supplies.get(appState);

    return pipe(
      brands,
      A.reduce({} as Supplies, (acc, brand) => ({
        ...acc,
        [brand]: {
          positions: suppliesByListIdAndBrand(listId)(brand)(state),
          description: pipe(descByIdAndBrand(listId)(brand).getOption(state), O.toUndefined)
        }
      }))
    );
  };

  export const updateSupply = (s: SupplyPayload) => supplyById(s.id).set(s);
  export const removeSupply = (s: SupplyRemovalPayload) =>
    flow(byId.modify(R.deleteAt(s.id)), modifyByList(s.listId)(A.filter(id => id !== s.id)));
  export const addSupply = (s: SupplyPayload) =>
    flow(
      byId.modify(R.insertAt(s.id, { supply: s.supply, id: s.id })),
      modifyByList(s.listId)(a => A.snoc(a, s.id))
    );

  export const modifyDesc = (s: SupplyDescPayload) => descByIdAndBrand(s.listId)(s.brand).set(s.text);
  export const addListId = (listId: SupplyListId) =>
    flow(
      byList.modify(R.insertAt(listId, [] as SupplyId[])),
      desc.modify(
        R.insertAt(
          listId,
          pipe(
            brands,
            A.reduce({} as DescMap, (acc, brand) => ({ ...acc, [brand]: "" }))
          )
        )
      )
    );
}

export const reducer = createReducer(State.empty())<Actions>({
  MODIFY_SUPPLY_TYPE_DESC: (s, { payload }) => Lenses.modifyDesc(payload)(s),
  ADD_SUPPLY_INTENT: identity,
  ADD_SUPPLY: (s, { payload }) => Lenses.addSupply(payload)(s),
  UPDATE_SUPPLY_INTENT: identity,
  UPDATE_SUPPLY: (s, { payload }) => Lenses.updateSupply(payload)(s),
  REMOVE_SUPPLY: (s, { payload }) => Lenses.removeSupply(payload)(s),
  ADD_SUPPLY_LIST_ID: (s, { payload }) => Lenses.addListId(payload)(s)
});

export const effect: AppEffect = action$ =>
  action$.pipe(
    fromActions(Actions.ADD_SUPPLY_INTENT),
    pluck("payload"),
    map(s => ({ ...s, id: UUID.gen() })),
    map(Actions.ADD_SUPPLY)
  );
