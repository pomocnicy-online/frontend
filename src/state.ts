import { U, createStore, ActionsUnion, createReducer, Store } from "@rxsv/core";

export const Actions = U.createUnion(
    U.caseOf("NECESSITOUS__REQUEST__SUCCEEDED")(),
    U.caseOf("CLOSE_THANK_YOU_MODAL")()
);
type Actions = ActionsUnion<typeof Actions>;

export type AppAction = Actions;
export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = Store<AppAction, AppState>;

const rootReducer = createReducer({ showThankYouModal: false })<Actions>({
    NECESSITOUS__REQUEST__SUCCEEDED: () => ({ showThankYouModal: true }),
    CLOSE_THANK_YOU_MODAL: () => ({ showThankYouModal: false })
});

export const rootStore = () => createStore(rootReducer);
