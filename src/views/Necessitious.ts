import { Step } from "./Necessitous/Step";

/* eslint-disable @typescript-eslint/no-empty-interface */
export namespace Necessitous {
    const path = "???";

    export interface Request {}

    export interface Reponse {}

    export const send = (req: Request): Promise<Reponse> =>
        fetch(path, {
            method: "POST",
            body: JSON.stringify(req)
        }).then(res => res.json());

    export const createRequest = (steps: Step.Dict): Request => ({});
}
