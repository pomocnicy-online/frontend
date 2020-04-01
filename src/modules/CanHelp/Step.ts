import * as U from "unionize";
import { M } from "@/common/prelude";
import { DemandData } from "../Necessitous/Step";

export const Step = U.unionize({
    Contact: U.ofType<ContactData>(),
    Outlet: U.ofType<OutletData>(),
    Supply: U.ofType<SupplyData>(),
    Summary: U.ofType<SummaryData>()
});
export type Step = U.UnionOf<typeof Step>;
export type StepDict = U.RecordOf<typeof Step>;

export enum Paths {
    Contact = "1",
    Outlet = "2",
    Supply = "3",
    Summary = "4"
}

export const nextStep = Step.match({
    Contact: M.some(Paths.Outlet),
    Outlet: M.some(Paths.Supply),
    Supply: M.some(Paths.Summary),
    default: M.none
});

export const prevStep = Step.match({
    Summary: M.some(Paths.Supply),
    Supply: M.some(Paths.Outlet),
    Outlet: M.some(Paths.Contact),
    default: M.none
});

export interface ContactData {
    name: string;
    email: string;
    phone: string;
}

export interface OutletSupplyRequest {
    requestId: number;
    name: string;
}

export interface OutletData {
    request: OutletSupplyRequest[];
}

export type SupplyData = DemandData;

export interface SummaryData {
    comment?: string;
    willDeliverTheSupplies: boolean;
}
