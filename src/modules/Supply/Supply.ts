import * as U from "unionize";
import * as O from "fp-ts/es6/Option";
import * as A from "fp-ts/es6/Array";
import * as R from "fp-ts/es6/Record";
import { UUID, DiscriminateUnion } from "@/common/prelude";
import { pipe } from "fp-ts/es6/pipeable";
import { NonEmptyArray } from "fp-ts/es6/NonEmptyArray";

export const Supply = U.unionize({
  Mask: U.ofType<{ style: Style; type: UsageType; quantity: number }>(),
  Glove: U.ofType<{ size: Size; quantity: number; material: Material }>(),
  Suit: U.ofType<{ size: Size } & Shared>(),
  Disinfectant: U.ofType<Shared>(),
  Cleaning: U.ofType<Shared>(),
  Other: U.ofType<Shared>(),
  Grocery: U.ofType<Shared>(),
  SewingMaterial: U.ofType<Shared>(),
  PsychologicalSupport: U.ofType<Shared>(),
  Print: U.ofType<{ quantity: number; printType: PrintType }>()
});
export type Supply = U.UnionOf<typeof Supply>;

export type SupplyId = UUID;
export type SupplyListId = string;

export const brands = Object.keys(Supply._Record) as NonEmptyArray<Brand>;

export type Brand = typeof Supply._Tags;
export type Order = Supplies[Brand];
export type SupplyCaseOf<T extends Brand> = DiscriminateUnion<Supply, "tag", T>;
export type Supplies = {
  [T in Brand]: {
    positions: { supply: SupplyCaseOf<T>; id: SupplyId }[];
    description?: string;
  };
};
export type OrderPos = Order["positions"] extends Array<infer T> ? T[] : never;

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
  VenturiNozzle = "VenturiNozzle",
  VenturiValve = "VenturiValve",
  PositiveExperienceValve = "PositiveExperienceValve",
  PlexiFaceCover = "PlexiFaceCover",
  CoverMask = "CoverMask"
}

export enum Material {
  Latex = "Latex",
  Nitrile = "Nitrile",
  Vinyl = "Vinyl",
  Foil = "Foil"
}

export interface SummaryViewData {
  brand: Brand;
  icon: string;
  title: string;
  quantity: number;
}

// TODO: use i18n
const supplyName = (brand: Brand) =>
  ({
    Mask: () => "Maseczki",
    Glove: () => "Rekawiczki",
    Disinfectant: () => "Środki do dezynfekcji",
    Suit: () => "Kombinezony",
    Cleaning: () => "Inne środki czystości",
    PsychologicalSupport: () => "Wsparcie psychologiczne",
    Grocery: () => "Artykuły spozywcze",
    SewingMaterial: () => "Materiały do szycia",
    Print: () => "Druk 3D",
    Other: () => "Inner"
  }[brand]());

const quantity = (orderPos: OrderPos) => orderPos.reduce((acc, pos) => acc + pos.supply.quantity, 0);

export const toSummary = (supplies?: Partial<Supplies>): SummaryViewData[] =>
  pipe(
    O.fromNullable(supplies),
    O.map(x => R.toArray<Brand, Order>(x as Supplies)),
    O.getOrElse<[Brand, Order][]>(() => []),
    A.map(([brand, order]) => ({
      brand,
      icon: `${brand}-icon`,
      title: supplyName(brand),
      quantity: quantity(order.positions),
      description: order.description
    })),
    A.filter(x => (x.brand === "PsychologicalSupport" || x.brand === "Other" ? x.description !== "" : x.quantity > 0))
  );
