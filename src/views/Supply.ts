export type Supply =
    | Supply.Mask
    | Supply.Glove
    | Supply.Suit
    | Supply.Disinfectant
    | Supply.Cleaning
    | Supply.Grocery
    | Supply.SewingMaterial
    | Supply.PsychologicalSupport
    | Supply.Print;

export namespace Supply {
    export enum UsageType {
        Disposable = "disposable",
        Reusable = "reusable"
    }

    export enum Style {
        Male = "Male",
        Female = "Female",
        Child = "Child"
    }

    export enum Size {
        XS = "XS",
        S = "S",
        M = "M",
        L = "L",
        XL = "XL"
    }

    export enum PrintType {
        VenturiNozzle = "VenturiNozzle"
    }

    export enum Material {
        Latex = "Latex",
        Nitrile = "Nitrile",
        Vinyl = "Vinyl",
        Foil = "Foil"
    }

    export interface Mask {
        __brand: "mask";
        style: Style;
        type: UsageType;
        quantity: number;
    }

    export interface Glove {
        __brand: "glove";
        type: UsageType;
        size: Size;
        quantity: number;
        material: Material;
    }

    export interface Suit {
        __brand: "suit";
        type: UsageType;
        size: Size;
        quantity: number;
    }

    export interface Disinfectant {
        __brand: "disinfectant";
        type: string;
        quantity: number;
    }

    export interface Cleaning {
        __brand: "cleaning";
        type: string;
        quantity: number;
    }

    export interface Other {
        __brand: "other";
        type: string;
        quantity: number;
    }

    export interface Grocery {
        __brand: "grocery";
        type: string;
        quantity: number;
    }

    export interface SewingMaterial {
        __brand: "sewingMaterial";
        type: string;
        quantity: number;
    }

    export interface PsychologicalSupport {
        __brand: "psychologicalSupport";
        type: string;
        quantity: number;
    }

    export interface Print {
        __brand: "print";
        type: PrintType;
        quantity: number;
    }

    export const typeName = (type: string) => {
        switch (type) {
            case "disposable":
                return "Jednorazowe";
            case "reusable":
                return "Wielorazowe";
            case "Male":
                return "Męskie";
            case "Female":
                return "Damskie";
            case "Child":
                return "Dziecięce";
            case "Latex":
                return "Lateksowe";
            case "Nitrile":
                return "Nitrylowe";
            case "Vinyl":
                return "Winylowe";
            case "Foil":
                return "Foliowe";
            default:
                return type;
        }
    };
}
