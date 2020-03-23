/* eslint-disable @typescript-eslint/no-namespace */
export type Step = Step.Contact | Step.Demand;

export namespace Step {
    export enum Paths {
        Contact = "1",
        Demand = "2",
        Summary = "3",
        ThankYou = "4"
    }

    export enum Steps {
        Demand = "demand",
        Contact = "contact",
        Summary = "summary"
    }

    export const nextPath = (step: Step) => {
        switch (step.type) {
            case Steps.Contact:
                return Paths.Demand;
            case Steps.Demand:
                return Paths.Summary;
            case Steps.Summary:
                return Paths.ThankYou;
            default:
                throw new Error("Impossible state");
        }
    };

    export const prevPath = (step: Step) => {
        switch (step.type) {
            case Steps.Demand:
                return Paths.Contact;
            case Steps.Summary:
                return Paths.Demand;
            default:
                throw new Error("Impossible state");
        }
    };

    export const Demand = (data: DemandData) => ({
        type: Steps.Demand,
        data,
        path: Paths.Demand
    });

    export type Demand = ReturnType<typeof Demand>;

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DemandData {
        // ??
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
        number: string;
        email: string;
        phone: string;
    }
}
