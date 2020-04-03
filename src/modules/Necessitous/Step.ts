import * as U from "unionize";
import { M } from "@/common/prelude";

import { Supplies } from "../Supply";

export const Step = U.unionize({
    Contact: U.ofType<ContactData>(),
    Demand: U.ofType<DemandData>(),
    Summary: U.ofType<SummaryData>()
});
export type Step = U.UnionOf<typeof Step>;
export type StepDict = U.RecordOf<typeof Step>;

export enum Paths {
    Contact = "1",
    Demand = "2",
    Summary = "3"
}

export const nextStep = Step.match({
    Contact: M.some(Paths.Demand),
    Demand: M.some(Paths.Summary),
    default: M.none
});

export const prevStep = Step.match({
    Demand: M.some(Paths.Contact),
    Summary: M.some(Paths.Demand),
    default: M.none
});

export interface SummaryData {
    comment?: string;
}

export interface DemandData {
    supplies: Partial<Supplies>;
}

export interface ContactData {
    name: string;
    city: string;
    street: string;
    building: string;
    apartment?: string;
    postalCode?: string;
    email: string;
    phone: string;
}

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
