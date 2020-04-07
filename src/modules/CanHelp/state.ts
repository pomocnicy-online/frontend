import { U, ActionsUnion, createReducer, fromActions } from "@rxsv/core";

import router from "@/router";
import { ignoreElements, pluck, map, switchMap, withLatestFrom, mapTo, tap } from "rxjs/operators";
import { merge, from } from "rxjs";
import * as RD from "@devexperts/remote-data-ts";
import { Lens } from "monocle-ts/es6";
import { pipe } from "fp-ts/es6/pipeable";
import * as TE from "fp-ts/es6/TaskEither";
import * as E from "fp-ts/es6/Either";
import * as O from "fp-ts/es6/Option";
import { flow } from "fp-ts/es6/function";

import { M } from "@/common/prelude";
import { AppState, AppEffect, AppAction } from "@/root";
import { Actions as CommonActions } from "@/common/state";

import { Step, StepDict, Paths, nextStep, prevStep } from "./Step";
import { CanHelp } from "./CanHelp";

export const Actions = U.createUnion(
  U.caseOf("NEXT_CAN_HELP_STEP")<Step>(),
  U.caseOf("PREV_CAN_HELP_STEP")<Step>(),
  U.caseOf("SET_CAN_HELP_STEP")<Step>(),
  U.caseOf("CAN_HELP_REQUEST_STARTED")(),
  U.caseOf("CAN_HELP_REQUEST_DONE")<void>(),
  U.caseOf("CAN_HELP_REQUEST_FAILED")<Error>()
);
export type Actions = ActionsUnion<typeof Actions>;
type RequestId = string;

export type State = { steps: Partial<StepDict>; request: RD.RemoteData<Error, void> };
export namespace State {
  export const empty = (): State => ({ steps: {}, request: RD.initial });
}

export namespace Lenses {
  const canHelp = Lens.fromProp<AppState>()("canHelp");
  export const steps = Lens.fromProp<State>()("steps");
  export const request = Lens.fromProp<State>()("request");

  export const setStep = (step: Step) => steps.modify(r => ({ ...r, [step.tag]: step }));
  export const stepsFromRoot = canHelp.compose(steps);
}

export const reducer = createReducer(State.empty())<Actions>({
  NEXT_CAN_HELP_STEP: (s, { payload }) => Lenses.setStep(payload)(s),
  PREV_CAN_HELP_STEP: (s, { payload }) => Lenses.setStep(payload)(s),
  SET_CAN_HELP_STEP: (s, { payload }) => Lenses.setStep(payload)(s),
  CAN_HELP_REQUEST_STARTED: Lenses.request.set(RD.pending),
  CAN_HELP_REQUEST_DONE: Lenses.request.set(RD.success(void 0)),
  CAN_HELP_REQUEST_FAILED: (s, { payload }) => Lenses.request.set(RD.failure(payload))(s)
});

export const effect: AppEffect = (action$, state$) => {
  const request$ = action$.pipe(
    fromActions(Actions.CAN_HELP_REQUEST_STARTED),
    withLatestFrom(state$),
    switchMap(([, state]) =>
      from(pipe(state, Lenses.stepsFromRoot.get, CanHelp.createRequest, TE.fromEither, TE.chain(CanHelp.send))())
    ),
    map(flow(E.fold<Error, void, AppAction>(Actions.CAN_HELP_REQUEST_FAILED, Actions.CAN_HELP_REQUEST_DONE)))
  );

  const requestDone$ = action$.pipe(fromActions(Actions.CAN_HELP_REQUEST_DONE));

  const step$ = merge(
    action$.pipe(fromActions(Actions.NEXT_CAN_HELP_STEP), pluck("payload"), map(nextStep)),
    action$.pipe(fromActions(Actions.PREV_CAN_HELP_STEP), pluck("payload"), map(prevStep)),
    requestDone$.pipe(mapTo(O.some("/" as Paths)))
  ).pipe(
    map(
      flow(
        O.map(path => ({ path })),
        M.tap(p => router.push(p))
      )
    ),
    ignoreElements()
  );

  const showModal$ = requestDone$.pipe(map(CommonActions.SHOW_THANK_YOU_MODAL));

  return merge(step$, request$, showModal$);
};
