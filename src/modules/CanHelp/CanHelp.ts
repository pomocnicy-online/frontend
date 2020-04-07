import * as E from "fp-ts/es6/Either";
import * as O from "fp-ts/es6/Option";
import * as A from "fp-ts/es6/Array";
import * as R from "fp-ts/es6/Record";
import { flow } from "fp-ts/es6/function";
import { pipe } from "fp-ts/es6/pipeable";

import { M } from "@/common/prelude";

import { Necessitous } from "../Necessitous/Necessitious";
import { StepDict, ContactData, OutletSupplyRequest, SupplyData, SummaryData } from "./Step";

export type CanHelp = {
  [K in keyof CanHelp.Request]: CanHelp.Request[K];
}[keyof CanHelp.Request];
export namespace CanHelp {
  export const canHelpPath = "/api/offerHelp";

  export type Request = { helper: Request.Helper; requests: Request.SupplyRequest[] };
  export namespace Request {
    export type Supplies = Omit<Necessitous.Request, "medicalCentre">;

    export type Helper = { firstName: string; phoneNumber: string; email: string };
    export const Helper = (d: ContactData) => O.some({ firstName: d.name, phoneNumber: d.phone, email: d.email });

    export type SupplyRequest = Supplies & { requestId: number };
    export const SupplyRequest = (
      { requestId }: OutletSupplyRequest,
      { supplies }: SupplyData,
      summary: SummaryData
    ): O.Option<SupplyRequest> => {
      const reqSupplies: Record<keyof Supplies, O.Option<{ [K in keyof Supplies]: Supplies[K] }[keyof Supplies]>> = {
        ...Necessitous.Request.fromAdditionalComment(summary.comment),
        ...Necessitous.Request.fromSupplies(supplies)
      };

      return O.some({ requestId, ...R.compact(reqSupplies) });
    };
  }

  const isNotPartial = (steps: Partial<StepDict>): steps is StepDict =>
    !!(steps.Contact && steps.Outlet && steps.Supply && steps.Summary);
  const fromNonPartial = E.fromPredicate(isNotPartial, () => new Error("Partial request"));

  export const send = (req: Request) => Necessitous.sender<Request, string>(req, canHelpPath);
  export const createRequest = flow(
    fromNonPartial,
    E.chain(steps =>
      pipe(
        M.sequence(
          Request.Helper(steps.Contact),
          pipe(
            // for now we are only making one request at time
            steps.Outlet.request,
            A.head,
            O.chain(req => Request.SupplyRequest(req, steps.Supply, steps.Summary)),
            O.map(x => [x])
          )
        ),
        O.map(([helper, requests]) => ({ helper, requests })),
        E.fromOption(() => new Error("Incorrect request format"))
      )
    )
  );
}
