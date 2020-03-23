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

    export interface Mask {
        style: Style;
        type: UsageType;
        count: number;
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

    export interface Glove {
        type: UsageType;
        size: Size;
        count: number;
        material: Material;
    }

    export interface Suit {
        type: UsageType;
        size: Size;
        count: number;
    }

    export interface Disinfectant {
        type: string;
        count: number;
    }

    export interface Cleaning {
        type: string;
        count: number;
    }

    export interface Comestible {
        type: string;
        count: number;
    }

    export interface SewingMaterial {
        type: string;
        count: number;
    }

    export interface PsychologicalSupport {
        type: string;
        count: number;
    }
}
