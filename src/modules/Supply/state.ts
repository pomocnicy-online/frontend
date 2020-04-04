import { U, ActionsUnion, createReducer, Effect, fromActions } from "@rxsv/core";
import { v4 as uuidv4 } from "uuid";
import { map, pluck } from "rxjs/operators";
import { Lens, fromTraversable, Prism } from "monocle-ts/es6";
import * as R from "fp-ts/es6/Record";
import * as F from "fp-ts/es6/function";

import { Supply } from "../Supply";

export type UUID = string & { readonly __brand: unique symbol };
export namespace UUID {
    export const of = (str: string) => str as UUID;

    // side effectful
    export const gen = () => of(uuidv4());
}

interface StoreSupply {
    id: UUID;
    supply: Supply;
}

export const Actions = U.createUnion(
    U.caseOf("ADD_SUPPLY_INTENT")<Supply>(),
    U.caseOf("ADD_SUPPLY")<StoreSupply>(),
    U.caseOf("UPDATE_SUPPLY")<StoreSupply>(),
    U.caseOf("REMOVE_SUPPLY")<StoreSupply>()
);
export type Actions = ActionsUnion<typeof Actions>;

export type State = {
    byId: Record<UUID, StoreSupply>;
};

export namespace Select {
    const byId = Lens.fromProp<State>()("byId");
    const supply = Lens.fromProp<StoreSupply>()("supply");
    const supplyTraversal = fromTraversable(R.record)<StoreSupply>();
    const getSupplyPrism = (id: UUID) => Prism.fromPredicate<StoreSupply>(s => s.id === id);
    const getSupplyTraversal = (id: UUID) =>
        byId
            .composeTraversal(supplyTraversal)
            .composePrism(getSupplyPrism(id))
            .composeLens(supply);

    export const updateSupply = (s: StoreSupply) => getSupplyTraversal(s.id).set(s.supply);
    export const removeSupply = (s: StoreSupply) => byId.modify(R.deleteAt(s.id));
    export const addSupply = (s: StoreSupply) => byId.modify(R.insertAt(s.id, s));
}

export const reducer = createReducer({ byId: {} } as State)<Actions>({
    ADD_SUPPLY_INTENT: F.identity,
    ADD_SUPPLY: (state, { payload }) => Select.addSupply(payload)(state),
    UPDATE_SUPPLY: (state, { payload }) => Select.updateSupply(payload)(state),
    REMOVE_SUPPLY: (state, { payload }) => Select.removeSupply(payload)(state)
});

export const effect: Effect<Actions, State> = action$ =>
    action$.pipe(
        fromActions(Actions.ADD_SUPPLY_INTENT),
        pluck("payload"),
        map(supply => Actions.ADD_SUPPLY({ supply, id: UUID.gen() }))
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
