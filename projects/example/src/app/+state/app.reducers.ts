import { Action, createReducer, on } from '@ngrx/store';
import { decrementAction, hideLoadingAction, incrementAction, setCounterAction, showLoadingAction } from './app.actions';

export interface AppState {
  counter: number;
  loading: boolean;
}

export const initialAppState: AppState = {
  counter: 0,
  loading: true
};

export function appReducer(state: AppState, action: Action) {
  return reducer(state, action);
}

const reducer = createReducer(
  initialAppState,

  on(showLoadingAction, (state: AppState): AppState => ({
    ...state,
    loading: true
  })),
  on(hideLoadingAction, (state: AppState): AppState => ({
    ...state,
    loading: false
  })),

  on(incrementAction, (state: AppState): AppState => ({
    ...state,
    counter: state.counter + 1
  })),
  on(decrementAction, (state: AppState): AppState => ({
    ...state,
    counter: state.counter - 1
  })),
  on(setCounterAction, (state: AppState, {counter}): AppState => ({
    ...state,
    counter
  }))
);
