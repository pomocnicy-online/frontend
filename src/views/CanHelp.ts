import * as E from "fp-ts/es6/Either";
import * as O from "fp-ts/es6/Option";
import * as A from "fp-ts/es6/Array";
import * as R from "fp-ts/es6/Record";
import { sequenceT } from "fp-ts/es6/Apply";
import { flow } from "fp-ts/es6/function";
import { pipe } from "fp-ts/es6/pipeable";

import { Necessitous } from "./Necessitious";
import { Step } from "./CanHelp/Step";

export type CanHelp = {
    [K in keyof CanHelp.Request]: CanHelp.Request[K];
}[keyof CanHelp.Request];
export namespace CanHelp {
    export const canHelpPath = "/api/offerHelp";

    export type Request = {
        helper: Request.Helper;
        requests: Request.SupplyRequest[];
    };

    export namespace Request {
        export type Supplies = Omit<Necessitous.Request, "medicalCentre">;

        export type Helper = { firstName: string; phoneNumber: string; email: string };
        export const Helper = (data: Step.ContactData) =>
            O.some({
                firstName: data.name,
                phoneNumber: data.phone,
                email: data.email
            });

        export type SupplyRequest = Supplies & { requestId: string };
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
                ...R.compact(reqSupplies)
            });
        };
    }

    const isNotPartial = (steps: Partial<Step.Dict>): steps is Step.Dict =>
        !!(steps.contact && steps.outlet && steps.supply && steps.summary);
    const fromNonPartial = E.fromPredicate(isNotPartial, () => new Error("Partial request"));

    export const send = (req: Request) => Necessitous.sender(req, canHelpPath);
    export const createRequest = flow(
        fromNonPartial,
        E.chain(steps => {
            const contact = steps.contact.data as Step.ContactData;
            const outlet = steps.outlet.data as Step.OutletData;
            const supplies = steps.supply.data as Step.SupplyData;
            const summary = steps.summary.data as Step.SummaryData;

            return pipe(
                sequenceT(O.option)(
                    Request.Helper(contact),
                    pipe(
                        // for now we are only making one request at time
                        outlet.request,
                        A.head,
                        O.chain(req => Request.SupplyRequest(req, supplies, summary)),
                        O.map(x => [x])
                    )
                ),
                O.map(([helper, requests]) => ({ helper, requests })),
                E.fromOption(() => new Error("Incorrect request format"))
            );
        })
    );
}
