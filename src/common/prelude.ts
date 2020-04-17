import * as O from "fp-ts/es6/Option";
import { flow, constant } from "fp-ts/es6/function";
import { sequenceT } from "fp-ts/es6/Apply";
import { v4 as uuidv4 } from "uuid";

export type DiscriminateUnion<U, K extends keyof U, V extends U[K]> = U extends Record<K, V> ? U : never;

export type UUID = string & { readonly __brand: unique symbol };
export namespace UUID {
  export const of = (str: string) => str as UUID;
  // side effectful 💥
  export const gen = () => of(uuidv4());
}

/**
 * M-aybe, a set of utilities for working with optional values based on `fp-ts`
 */
export namespace M {
  export const some = flow(O.some, constant);
  export const none = constant(O.none);

  export const sequence = sequenceT(O.option);
  export const tap = <A>(fn: (a: A) => void) => O.map<A, A>(x => (fn(x), x));

  export type OptionalRecord<T> = { [K in keyof T]: O.Option<T[K]> };
}
