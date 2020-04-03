import * as E from "fp-ts/es6/Either";
import * as O from "fp-ts/es6/Option";
import * as TE from "fp-ts/es6/TaskEither";
import * as R from "fp-ts/es6/Record";
import { pipe } from "fp-ts/es6/pipeable";
import { flow } from "fp-ts/es6/function";

import { Step } from "./Necessitous/Step";
import { Supply } from "./Supply";

/* eslint-disable @typescript-eslint/no-empty-interface */
export type Necessitous = {
    [K in keyof Necessitous.Request]: Necessitous.Request[K];
}[keyof Necessitous.Request];

export namespace Necessitous {
    // TODO: use URL builder
    const necessitousPath = "/api/requests";

    export type Request = Partial<{
        medicalCentre: Request.MedicalCentre;
        masks: Request.Mask;
        gloves: Request.Glove;
        groceries: Request.Grocery;
        disinfectionMeasures: Request.Disinfectant;
        suits: Request.Suite;
        otherCleaningMaterials: Request.Cleaning;
        psychologicalSupport: Request.PsychologicalSupport;
        sewingSupplies: Request.SewingSupplies;
        others: Request.Other;
        // AdditionalComment:
        prints: Request.Print;
    }>;
    export namespace Request {
        export interface MedicalCentre {
            legalName: string;
            city: string;
            street: string;
            buildingNumber: string;
            apartmentNumber?: string;
            postalCode?: string;
            email: string;
            phoneNumber: string;
        }
        export const MedicalCentre = (data: Step.ContactData): MedicalCentre => ({
            ...data,
            legalName: data.name,
            buildingNumber: data.building,
            apartmentNumber: data.apartment,
            phoneNumber: data.phone
        });

        // TODO: refactor serialization, io-ts ?, move to supplies ?

        const nonEmpty = <A extends keyof Step.Supplies, B>(fn: (data: Step.Supplies[A]) => B) => (
            data: Step.Supplies[A]
        ) => (data.positions.length > 0 ? O.some(fn(data)) : O.none);

        const nonEmptyDesc = (desc?: string) =>
            pipe(
                desc,
                O.fromNullable,
                O.filter(d => d !== ""),
                O.map(d => ({ description: d }))
            );

        export type Mask = SupplyRequest<{
            usageType: Supply.UsageType;
            quantity: number;
            style: Supply.Style;
        }>;
        export const Mask = nonEmpty<"mask", Mask>(data => ({
            ...data,
            positions: data.positions.map(a => ({
                ...a,
                usageType: a.type
            }))
        }));

        export type Glove = SupplyRequest<{
            material: Supply.Material;
            quantity: number;
            size: Supply.Size;
        }>;
        export const Glove = nonEmpty<"glove", Glove>(a => a);

        export type Grocery = SupplyRequest<{
            quantity: number;
            description?: string;
        }>;
        export const Grocery = nonEmpty<"grocery", Grocery>(a => a);

        export type Disinfectant = SupplyRequest<{
            quantity: number;
            description?: string;
        }>;
        export const Disinfectant = nonEmpty<"disinfectant", Disinfectant>(a => a);

        export type Suite = SupplyRequest<{
            material?: Supply.Material;
            quantity: number;
            size: Supply.Size;
        }>;
        export const Suite = nonEmpty<"suit", Suite>(a => a);

        export type Cleaning = SupplyRequest<{
            quantity: number;
            description?: string;
        }>;
        export const Cleaning = nonEmpty<"cleaning", Cleaning>(a => a);

        export type PsychologicalSupport = {
            description: string;
        };
        export const PsychologicalSupport = (data: Step.Supplies["psychologicalSupport"]) =>
            nonEmptyDesc(data.description);

        export type Other = {
            description: string;
        };
        export const Other = (data: Step.Supplies["other"]) => nonEmptyDesc(data.description);

        export type Print = SupplyRequest<{
            printType: Supply.PrintType;
            quantity: number;
        }>;
        export const Print = nonEmpty<"print", Print>(data => ({
            ...data,
            positions: data.positions.map(a => ({ ...a, printType: a.type }))
        }));

        export type SewingSupplies = {
            description: string;
        };
        export const SewingSupplies = (data: Step.Supplies["sewingMaterial"]) => nonEmptyDesc(data.description);
        export type AdditionalComment = {
            description?: string;
        };
        export const AdditionalComment = (data: Step.SummaryData["comment"]) => nonEmptyDesc(data);

        export const fromAdditionalComment = (comment?: string) => ({
            others: pipe(comment, O.fromNullable, O.chain(Request.AdditionalComment))
        });

        type SupplyRequest<T> = {
            description?: string;
            positions: T[];
        };

        // TODO: made Supply a custom Monad instance
        export const fromSupplies = (supplies: Partial<Step.Supplies>) => ({
            masks: pipe(supplies.mask, O.fromNullable, O.chain(Request.Mask)),
            gloves: pipe(supplies.glove, O.fromNullable, O.chain(Request.Glove)),
            groceries: pipe(supplies.grocery, O.fromNullable, O.chain(Request.Grocery)),
            disinfectionMeasures: pipe(supplies.disinfectant, O.fromNullable, O.chain(Request.Disinfectant)),
            suits: pipe(supplies.suit, O.fromNullable, O.chain(Request.Suite)),
            otherCleaningMaterials: pipe(supplies.cleaning, O.fromNullable, O.chain(Request.Cleaning)),
            psychologicalSupport: pipe(
                supplies.psychologicalSupport,
                O.fromNullable,
                O.chain(Request.PsychologicalSupport)
            ),
            sewingSupplies: pipe(supplies.sewingMaterial, O.fromNullable, O.chain(Request.SewingSupplies)),
            prints: pipe(supplies.print, O.fromNullable, O.chain(Request.Print)),
            others: pipe(supplies.other, O.fromNullable, O.chain(Request.Other))
        });
    }

    export interface Response {}

    const isNotPartial = (steps: Partial<Step.Dict>): steps is Step.Dict =>
        !!(steps.contact && steps.demand && steps.summary);
    const fromNonPartial = E.fromPredicate(isNotPartial, () => new Error("Partial request"));

    export const sender = <Req, Res>(req: Req, path: string): TE.TaskEither<Error, Res> =>
        TE.tryCatchK(
            () =>
                fetch(path, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(req)
                }).then(res => res.json()),
            () => new Error("Failed to send the request")
        )();

    export const send = (req: Request) => sender(req, necessitousPath);

    export const createRequest = flow(
        fromNonPartial,
        E.map(steps => {
            // TODO: narrow the types, use union builder
            const contact = steps.contact.data as Step.ContactData;
            const { supplies } = steps.demand.data as Step.DemandData;
            const summary = steps.summary.data as Step.SummaryData;

            const request: Record<keyof Necessitous.Request, O.Option<Necessitous>> = {
                medicalCentre: O.some(Request.MedicalCentre(contact)),
                // ...Request.AdditionalComment(summary.comment),
                ...Request.fromSupplies(supplies)
            };

            return request;
        }),
        E.map(R.compact)
    );
}
