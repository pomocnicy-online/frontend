import * as E from "fp-ts/es6/Either";
import * as O from "fp-ts/es6/Option";
import * as A from "fp-ts/es6/Array";
import * as R from "fp-ts/es6/Record";
import { flow } from "fp-ts/es6/function";
import { pipe } from "fp-ts/es6/pipeable";

import { Necessitous } from "./Necessitious";
import { Step } from "./CanHelp/Step";

export type CanHelp = {
    [K in keyof CanHelp.Request]: CanHelp.Request[K];
}[keyof CanHelp.Request];
export namespace CanHelp {
    export type Request = {
        helper: Request.Helper;
        requests: Request.SupplyRequest[];
    };

    export namespace Request {
        export type Supplies = Omit<Necessitous.Request, "medicalCentre">;

        export type Helper = Step.ContactData;
        export const Helper = (data: Step.ContactData) => O.some(data);

        export interface SupplyRequest {
            requestId: string;
            supplies: Supplies;
            willDeliverSupplies: boolean;
        }
        export const SupplyRequest = (
            { requestId }: Step.OutletSupplyRequest,
            { supplies }: Step.SupplyData,
            summary: Step.SummaryData
        ): O.Option<SupplyRequest> => {
            const reqSupplies: Record<
                keyof Supplies,
                O.Option<{ [K in keyof Supplies]: Supplies[K] }[keyof Supplies]>
            > = {
                ...Necessitous.Request.fromOther(summary.comment),
                ...Necessitous.Request.fromSupplies(supplies)
            };

            return O.some({
                requestId,
                supplies: R.compact(reqSupplies),
                willDeliverSupplies: summary.willDeliverTheSupplies
            });
        };
    }

    const error = () => new Error();
    const isNotPartial = (steps: Partial<Step.Dict>): steps is Step.Dict =>
        !!(steps.contact && steps.outlet && steps.supply && steps.summary);
    const fromNonPartial = E.fromPredicate(isNotPartial, error);

    export const send = (req: Request) => Necessitous.sender(req);
    export const createRequest = flow(
        fromNonPartial,
        E.map(steps => {
            const contact = steps.contact.data as Step.ContactData;
            const outlet = steps.outlet.data as Step.OutletData;
            const supplies = steps.supply.data as Step.SupplyData;
            const summary = steps.summary.data as Step.SummaryData;

            const request: Record<keyof CanHelp.Request, O.Option<CanHelp>> = {
                helper: Request.Helper(contact),
                requests: pipe(
                    // for now we are only making one request at time
                    outlet.request,
                    A.head,
                    O.chain(req => Request.SupplyRequest(req, supplies, summary)),
                    O.map(x => [x])
                )
            };

            return request;
        }),
        E.map(R.compact)
    );
}
