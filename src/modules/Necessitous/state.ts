import { U, createStore, ActionsUnion, createReducer, Store, fromActions, Effect } from "@rxsv/core";
import { Step, StepDict } from "./Step";

export const Actions = U.createUnion(
  U.caseOf("NEXT_NECESSITOUS_STEP")<Step>(),
  U.caseOf("PREV_NECESSITOUS_STEP")<Step>()
);
export type Actions = ActionsUnion<typeof Actions>;

export type State = Partial<StepDict>;

export const reducer = createReducer({} as State)<Actions>({
  NEXT_NECESSITOUS_STEP: (state, { payload }) => ({ ...state, [payload.tag]: payload }),
  PREV_NECESSITOUS_STEP: (state, { payload }) => ({ ...state, [payload.tag]: payload })
});

export const effect: Effect<Actions, State> = action$ => action$.pipe(fromActions(Actions.NEXT_NECESSITOUS_STEP));
