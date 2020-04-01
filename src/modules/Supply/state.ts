import { U, createStore, ActionsUnion, createReducer, Store } from "@rxsv/core";
import * as O from "fp-ts/es6/Option";
import * as R from "fp-ts/es6/Record";
import * as A from "fp-ts/es6/Array";
import { pipe } from "fp-ts/es6/pipeable";

import { Supply } from "../Supply";

type UUID = string & { readonly __brand: unique symbol };
const UUID = (str: string) => str as UUID;

interface SupplyPayload {
    id: UUID;
    supply: Supply;
}

export const Actions = U.createUnion(
    U.caseOf("ADD_SUPPLY")<SupplyPayload>(),
    U.caseOf("UPDATE_SUPPLY")<SupplyPayload>(),
    U.caseOf("REMOVE_SUPPLT")<SupplyPayload>()
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
}
