import { combineReducers, createStore, Store, combineEffects, Effect } from "@rxsv/core";
import { withDevTools } from "@rxsv/tools";

import * as common from "@/common/state";
import * as supplies from "@/modules/Supply/state";
import * as necessitous from "@/modules/Necessitous/state";
import * as canHelp from "@/modules/CanHelp/state";

export type AppAction = common.Actions | supplies.Actions | necessitous.Actions | canHelp.Actions;
export type AppState = ReturnType<typeof rootReducer>;
export type AppEffect = Effect<AppAction, AppState>;
export type AppStore = Store<AppAction, AppState>;

export const rootReducer = combineReducers({
  common: common.reducer,
  supplies: supplies.reducer,
  necessitous: necessitous.reducer,
  canHelp: canHelp.reducer
});

export const rootEffect = combineEffects(supplies.effect, necessitous.effect, canHelp.effect);

export const rootStore = (): AppStore => withDevTools(createStore(rootReducer, rootEffect));
