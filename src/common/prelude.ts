import * as O from "fp-ts/es6/Option";
import * as F from "fp-ts/es6/function";
import { sequenceT } from "fp-ts/es6/Apply";

/**
 * M-aybe, a set of utilities for working with optional values based on `fp-ts`
 */
export namespace M {
    export const some = F.flow(O.some, F.constant);
    export const none = () => O.none;

    export const sequence = sequenceT(O.option);
}
