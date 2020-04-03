import * as U from "unionize";

export const Supply = U.unionize({
    Mask: U.ofType<{ style: Style; type: UsageType; quantity: number }>(),
    Glove: U.ofType<{ type: UsageType; size: Size; quantity: number; material: Material }>(),
    Suit: U.ofType<{ size: Size } & Shared>(),
    Disinfectant: U.ofType<Shared>(),
    Cleaning: U.ofType<Shared>(),
    Other: U.ofType<Shared>(),
    Grocery: U.ofType<Shared>(),
    SewingMaterial: U.ofType<Shared>(),
    PsychologicalSupport: U.ofType<Shared>(),
    Print: U.ofType<Shared>(),
    Other: U.ofType<Shared>()
});
export type Supply = U.UnionOf<typeof Supply>;

type Shared = { type: string; quantity: number };

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
