import { U, ActionsUnion, createReducer, Effect, fromActions } from "@rxsv/core";
import { map, pluck } from "rxjs/operators";
import { Lens, fromTraversable, Prism } from "monocle-ts/es6";
import { UUID } from "@/common/prelude";
import * as R from "fp-ts/es6/Record";
import * as A from "fp-ts/es6/Array";
import { flow, identity } from "fp-ts/es6/function";
import { pipe } from "fp-ts/es6/pipeable";
import * as O from "fp-ts/es6/Option";

import { Supply } from "../Supply";

export type SupplyId = UUID;
export type SupplyListId = UUID;
export interface StoreSupply {
  id: SupplyId;
  listId: SupplyListId;
  supply: Supply;
}

export const Actions = U.createUnion(
  U.caseOf("ADD_SUPPLY_INTENT")<Omit<StoreSupply, "id">>(),
  U.caseOf("ADD_SUPPLY")<StoreSupply>(),
  U.caseOf("UPDATE_SUPPLY")<StoreSupply>(),
  U.caseOf("REMOVE_SUPPLY")<StoreSupply>()
);
export type Actions = ActionsUnion<typeof Actions>;

export type State = {
  byId: Record<SupplyId, StoreSupply>;
  byList: Record<SupplyListId, SupplyId[]>;
};
export namespace State {
  export const empty = (): State => ({ byId: {}, byList: {} });
}

export namespace Select {
  const byId = Lens.fromProp<State>()("byId");
  const byList = Lens.fromProp<State>()("byList");
  const supply = Lens.fromProp<StoreSupply>()("supply");

  const supplyTraversal = fromTraversable(R.record)<StoreSupply>();
  const getSupplyPrism = (id: UUID) => Prism.fromPredicate<StoreSupply>(s => s.id === id);
  const getSupplyTraversal = (id: UUID) =>
    byId
      .composeTraversal(supplyTraversal)
      .composePrism(getSupplyPrism(id))
      .composeLens(supply);

  // const listTraversal = fromTraversable(A.array)<>

  export const updateSupply = (s: StoreSupply) => getSupplyTraversal(s.id).set(s.supply);
  export const removeSupply = (s: StoreSupply) =>
    flow(
      byId.modify(R.deleteAt(s.id)),
      byList.modify(r =>
        pipe(
          r,
          R.modifyAt(
            s.listId,
            A.filter(id => id !== s.id)
          ),
          O.getOrElse(() => r)
        )
      )
    );
  export const addSupply = (s: StoreSupply) =>
    flow(
      byId.modify(R.insertAt(s.id, s)),
      byList.modify(r =>
        pipe(
          r,
          R.modifyAt(s.listId, r => A.snoc(r, s.id)),
          O.getOrElse(() => r)
        )
      )
    );

  export const suppliesByList = (id: SupplyListId) => null;
}

export const reducer = createReducer(State.empty())<Actions>({
  ADD_SUPPLY_INTENT: identity,
  ADD_SUPPLY: (s, { payload }) => Select.addSupply(payload)(s),
  UPDATE_SUPPLY: (s, { payload }) => Select.updateSupply(payload)(s),
  REMOVE_SUPPLY: (s, { payload }) => Select.removeSupply(payload)(s)
});

export const effect: Effect<Actions, State> = action$ =>
  action$.pipe(
    fromActions(Actions.ADD_SUPPLY_INTENT),
    pluck("payload"),
    map(s => ({ ...s, id: UUID.gen() })),
    map(Actions.ADD_SUPPLY)
  );

type DiscriminateUnion<U, K extends keyof U, V extends U[K]> = U extends Record<K, V> ? U : never;

export type Supplies = {
  [T in Supply["tag"]]: {
    positions: DiscriminateUnion<Supply, "tag", T>[];
    description?: string;
  };
};

export namespace Supplies {
  export type Brand = keyof Supplies;
  export type Order = Supplies[Brand];

  // TODO: use i18n
  const supplyName = Supply.match({
    Mask: () => "Maseczki",
    Glove: () => "Rekawiczki",
    Disinfectant: () => "Środki do dezynfekcji",
    Suit: () => "Kombinezony",
    Cleaning: () => "Inne środki czystości",
    PsychologicalSupport: () => "Wsparcie psychologiczne",
    Grocery: () => "Artykuły spozywcze",
    SewingMaterial: () => "Materiały do szycia",
    Print: () => "Druk 3D",
    Other: () => "Inner"
  });

  export interface SummaryViewData {
    brand: Brand;
    icon: string;
    title: string;
    quantity: number;
  }

  // export const toSummary = (supplies?: Partial<Supplies>): SummaryViewData[] =>
  //     pipe(
  //         O.fromNullable(supplies),
  //         O.map(x => R.toArray<Brand, Order>(x as Supplies)),
  //         O.getOrElse<[Brand, Order][]>(() => []),
  //         A.filter(([brand, supply]) => (brand === "PsychologicalSupport" ? supply.description !== "" : true)),
  //         A.map(([brand, supply]) => ({
  //             brand,
  //             icon: `${brand}-icon`,
  //             title: supplyName(brand),
  //             quantity: (supply.positions as Supply[]).reduce((acc, pos) => acc + pos.quantity, 0)
  //         })),
  //         A.filter(x => x.quantity > 0)
  //     );

  // export const toSummary = (supplies?: Partial<Supplies>): SummaryViewData[] =>
  //             pipe(
  //                 O.fromNullable(supplies),
  //                 O.map(x => R.toArray<Brand, Order>(x as Supplies)),
  //                 O.getOrElse<[Brand, Order][]>(() => []),
  //                 A.map(([brand, supply]) => ({
  //                     brand,
  //                     icon: `${brand}-icon`,
  //                     title: supplyName(brand),
  //                     quantity: (supply.positions as Supply[]).reduce((acc, pos) => acc + pos.quantity, 0),
  //                     description: supply.description
  //                 })),
  //                 A.filter(x =>
  //                     x.brand === "psychologicalSupport" || x.brand === "other" ? x.description !== "" : x.quantity > 0
  //                 )
  //             );
}
