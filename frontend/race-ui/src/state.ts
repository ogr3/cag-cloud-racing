import { combineReducers } from 'redux';
import { backendEventChannelReducer } from './backend-event-channel/backend-event-channel.state';
import { leaderboardReducer } from "./leaderboard/leaderboard.state";
import { currentraceReducer } from "./currentrace/currentrace.state";
import { StateType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';
import { appStateReducer } from './App.state';
import { mainPageReducer } from "./main-page/main-page-state"

export const rootReducer = combineReducers({
  appState: appStateReducer,
  backendEventChannelState: backendEventChannelReducer,
  leaderboardState: leaderboardReducer,
  currentraceState: currentraceReducer,
  mainPageState: mainPageReducer
});

export type RootState = DeepReadonly<StateType<typeof rootReducer>>;
