import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducers';

const selectApp = createFeatureSelector('app');

export const selectLoading = createSelector(selectApp, ({loading}: AppState) => loading);

export const selectCounter = createSelector(selectApp, ({counter}: AppState) => counter);
