import * as O from "fp-ts/es6/Option";
import { flow, constant } from "fp-ts/es6/function";
import { sequenceT } from "fp-ts/es6/Apply";

/**
 * M-aybe, a set of utilities for working with optional values based on `fp-ts`
 */
export namespace M {
    export const some = flow(O.some, constant);
    export const none = constant(O.none);

    export const sequence = sequenceT(O.option);
}
