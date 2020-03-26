export type Step = Step.Contact;

export namespace Step {
    export type Dict = Record<Step["type"], Step>;

    export enum Paths {
        Contact = "1"
    }

    export enum Steps {
        Contact = "contact"
    }

    export const Contact = (data: ContactData) => ({
        type: Steps.Contact,
        data,
        path: Paths.Contact
    });
    export type Contact = ReturnType<typeof Contact>;

    export interface ContactData {
        name: string;
        surname: string;
        city?: string; // optional
        street?: string; // optional
        building: string;
        email: string;
        phone: string;
    }
}
