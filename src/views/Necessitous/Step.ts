import * as U from "unionize";
import { M } from "@/common/prelude";

import { Supplies } from "../Supply";

export const Step = U.unionize({
    Contact: U.ofType<ContactData>(),
    Demand: U.ofType<DemandData>(),
    Summary: U.ofType<SummaryData>()
});

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
