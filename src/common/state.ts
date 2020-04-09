import { U, ActionsUnion, createReducer } from "@rxsv/core";

export const Actions = U.createUnion(U.caseOf("SHOW_THANK_YOU_MODAL")(), U.caseOf("CLOSE_THANK_YOU_MODAL")());
export type Actions = ActionsUnion<typeof Actions>;

export type State = { showThankYouModal: boolean };
export namespace State {
  export const empty = (): State => ({ showThankYouModal: false });
}

export const reducer = createReducer(State.empty())<Actions>({
  SHOW_THANK_YOU_MODAL: () => ({ showThankYouModal: true }),
  CLOSE_THANK_YOU_MODAL: () => ({ showThankYouModal: false })
});
