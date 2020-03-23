export type Supply =
    | Supply.Mask
    | Supply.Glove
    | Supply.Disinfectant
    | Supply.Cleaning
    | Supply.Comestible
    | Supply.SewingMaterial
    | Supply.PsychologicalSupport;

export namespace Supply {
    export enum UsageType {
        Disposable = "disposable",
        Reusable = "reusable"
    }

    export enum Style {
        Male = "M",
        Female = "F",
        Child = "C"
    }

    export enum Size {
        XS = "xs",
        S = "s",
        M = "m",
        L = "l",
        XL = "xl"
    }

    export enum Material {
        Latex = "latex",
        Nitrile = "nitrile",
        Vinyl = "vinyl",
        Foil = "Foil"
    }

    export interface Mask {
        __brand: "mask";
        style: Style;
        type: UsageType;
        count: number;
    }

    export interface Glove {
        __brand: "glove";
        type: UsageType;
        size: Size;
        count: number;
        material: Material;
    }

    export interface Suit {
        __brand: "suit";
        type: UsageType;
        size: Size;
        count: number;
    }

    export interface Disinfectant {
        __brand: "disinfectant";
        type: string;
        count: number;
    }

    export interface Cleaning {
        __brand: "cleaning";
        type: string;
        count: number;
    }

    export interface Comestible {
        __brand: "comestible";
        type: string;
        count: number;
    }

    export interface SewingMaterial {
        __brand: "sewingMaterial";
        type: string;
        count: number;
    }

    export interface PsychologicalSupport {
        __brand: "psychologicalSupport";
        type: string;
        count: number;
    }
}
