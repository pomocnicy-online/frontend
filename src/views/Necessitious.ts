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
    const path = "/api/requests";

    export type Request = Partial<{
        medicalCentre: Request.MedicalCentre;
        maskRequest: Request.Mask;
        gloveRequest: Request.Glove;
        groceryRequest: Request.Grocery;
        disinfectionMeasureRequest: Request.Disinfectant;
        suitRequest: Request.Suite;
        otherCleaningMaterialRequest: Request.Cleaning;
        psychologicalSupportRequest: Request.PsychologicalSupport;
        sewingSuppliesRequest: Request.SewingSupplies;
        otherRequest: Request.Other;
        printRequest: Request.Print;
    }>;
    export namespace Request {
        export interface MedicalCentre {
            legalName: string;
            city: string;
            street: string;
            buildingNumber: string;
            apartmentNumber: string;
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

        export type Mask = SupplyRequest<{
            usageType: Supply.UsageType;
            quantity: number;
            style: Supply.Style;
        }>;
        export const Mask = (data: Step.Supplies["mask"]): Mask => ({
            ...data,
            positions: data.positions.map(a => ({
                ...a,
                usageType: a.type
            }))
        });

        export type Glove = SupplyRequest<{
            material: Supply.Material;
            quantity: number;
            size: Supply.Size;
        }>;
        export const Glove = (data: Step.Supplies["glove"]): Glove => data;

        export type Grocery = SupplyRequest<{
            quantity: number;
            description?: string;
        }>;
        export const Grocery = (data: Step.Supplies["grocery"]): Grocery => data;

        export type Disinfectant = SupplyRequest<{
            quantity: number;
            description?: string;
        }>;
        export const Disinfectant = (data: Step.Supplies["disinfectant"]): Disinfectant => data;

        export type Suite = SupplyRequest<{
            material: Supply.Material;
            quantity: number;
            size: Supply.Size;
        }>;
        export const Suite = (data: Step.Supplies["suit"]) => data;

        export type Cleaning = SupplyRequest<{
            quantity: number;
            description: string;
        }>;
        export const Cleaning = (data: Step.Supplies["cleaning"]) => data;

        export type PsychologicalSupport = {
            description: string;
        };
        export const PsychologicalSupport = (data: Step.Supplies["psychologicalSupport"]) => data;

        export type Print = SupplyRequest<{
            printType: Supply.PrintType;
            quantity: number;
        }>;
        export const Print = (data: Step.Supplies["print"]) => ({
            ...data,
            positions: data.positions.map(a => ({ ...a, printType: a.type }))
        });

        export type SewingSupplies = {
            description: string;
        };
        export const SewingSupplies = (data: Step.Supplies["sewingMaterial"]) => data;

        export type Other = {
            description?: string;
        };
        export const Other = (comment: Step.SummaryData["comment"]) => ({
            description: comment
        });

        type SupplyRequest<T> = {
            description?: string;
            positions: T[];
        };
    }

    export interface Response {}

    const error = () => new Error();
    const isNotPartial = (steps: Partial<Step.Dict>): steps is Step.Dict =>
        !!(steps.contact && steps.demand && steps.summary);

    export const send = (req: Request): TE.TaskEither<Error, Response> =>
        TE.tryCatchK(
            () =>
                fetch(path, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(req)
                })
                    .then(res => res.json())
                    .catch(x => {
                        console.log("promise x");
                        return x;
                    }),
            error
        )();

    export const createRequest = flow(
        E.fromPredicate(isNotPartial, error),
        E.map(steps => {
            // TODO: narrow the types, use union builder
            const contact = steps.contact.data as Step.ContactData;
            const { supplies } = steps.demand.data as Step.DemandData;
            const summary = steps.summary.data as Step.SummaryData;

            const request: Record<keyof Necessitous.Request, O.Option<Necessitous>> = {
                medicalCentre: O.some(Request.MedicalCentre(contact)),
                maskRequest: pipe(supplies.mask, O.fromNullable, O.map(Request.Mask)),
                gloveRequest: pipe(supplies.glove, O.fromNullable, O.map(Request.Glove)),
                groceryRequest: pipe(supplies.grocery, O.fromNullable, O.map(Request.Grocery)),
                disinfectionMeasureRequest: pipe(supplies.disinfectant, O.fromNullable, O.map(Request.Disinfectant)),
                suitRequest: pipe(supplies.suit, O.fromNullable, O.map(Request.Suite)),
                otherCleaningMaterialRequest: pipe(supplies.cleaning, O.fromNullable, O.map(Request.Cleaning)),
                psychologicalSupportRequest: pipe(
                    supplies.psychologicalSupport,
                    O.fromNullable,
                    O.map(Request.PsychologicalSupport)
                ),
                sewingSuppliesRequest: pipe(supplies.sewingMaterial, O.fromNullable, O.map(Request.SewingSupplies)),
                printRequest: pipe(supplies.print, O.fromNullable, O.map(Request.Print)),
                otherRequest: pipe(summary.comment, O.fromNullable, O.map(Request.Other))
            };

            return request;
        }),
        E.map(R.compact)
    );
}
