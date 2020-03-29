import { Supply } from "../Supply";
import * as O from "fp-ts/es6/Option";
import * as R from "fp-ts/es6/Record";
import * as A from "fp-ts/es6/Array";
import { pipe } from "fp-ts/es6/pipeable";

export type Step = Step.Contact | Step.Demand | Step.Summary;
export namespace Step {
    export type Dict = Record<Step["type"], Step>;

    export enum Paths {
        Contact = "1",
        Demand = "2",
        Summary = "3"
    }

    export enum Steps {
        Demand = "demand",
        Contact = "contact",
        Summary = "summary"
    }

    export const nextPath = (step: Step): O.Option<string> => {
        switch (step.type) {
            case Steps.Contact:
                return O.some(Paths.Demand);
            case Steps.Demand:
                return O.some(Paths.Summary);
            default:
                return O.none;
        }
    };

    export const prevPath = (step: Step): O.Option<string> => {
        switch (step.type) {
            case Steps.Demand:
                return O.some(Paths.Contact);
            case Steps.Summary:
                return O.some(Paths.Demand);
            default:
                return O.none;
        }
    };

    export const Summary = (data: SummaryData) => ({
        type: Steps.Summary,
        data,
        path: Paths.Summary
    });
    export type Summary = ReturnType<typeof Summary>;

    export interface SummaryData {
        comment?: string;
    }

    export const Demand = (data: DemandData) => ({
        type: Steps.Demand,
        data,
        path: Paths.Demand
    });
    export type Demand = ReturnType<typeof Demand>;

    type DiscriminateUnion<U, K extends keyof U, V extends U[K]> = U extends Record<K, V> ? U : never;

    export type Supplies = {
        [T in Supply["__brand"]]: {
            positions: DiscriminateUnion<Supply, "__brand", T>[];
            description?: string;
        };
    };

    export namespace Supplies {
        export type Brand = keyof Supplies;
        export type Order = Supplies[Brand];

        const supplyName = (brand: Brand): string => {
            switch (brand) {
                case "mask":
                    return "Maseczki";
                case "glove":
                    return "Rekawiczki";
                case "disinfectant":
                    return "Środki do dezynfekcji";
                case "suit":
                    return "Kombinezony";
                case "cleaning":
                    return "Inne środki czystości";
                case "psychologicalSupport":
                    return "Wsparcie psychologiczne";
                case "grocery":
                    return "Artykuły spozywcze";
                case "sewingMaterial":
                    return "Materiały do szycia";
                case "print":
                    return "Druk 3D";
            }
        };

        export interface SummaryViewData {
            brand: Brand;
            icon: string;
            title: string;
            quantity: number;
        }

        export const toSummary = (supplies?: Partial<Supplies>): SummaryViewData[] =>
            pipe(
                O.fromNullable(supplies),
                O.map(x => R.toArray<Brand, Order>(x as Supplies)),
                O.getOrElse<[Brand, Order][]>(() => []),
                A.filter(([brand, supply]) => (brand === "psychologicalSupport" ? supply.description !== "" : true)),
                A.map(([brand, supply]) => ({
                    brand,
                    icon: `${brand}-icon`,
                    title: supplyName(brand),
                    quantity: (supply.positions as Supply[]).reduce((acc, pos) => acc + pos.quantity, 0)
                })),
                A.filter(x => x.quantity > 0)
            );
    }

    export interface DemandData {
        supplies: Partial<Supplies>;
    }

    export const Contact = (data: ContactData) => ({
        type: Steps.Contact,
        data,
        path: Paths.Contact
    });
    export type Contact = ReturnType<typeof Contact>;

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
}
