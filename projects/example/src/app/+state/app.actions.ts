import { createAction, props } from '@ngrx/store';

export const showLoadingAction = createAction('[APP] showLoading');
export const hideLoadingAction = createAction('[APP] hideLoading');

export const incrementAction = createAction('[APP] increment');
export const decrementAction = createAction('[APP] decrement');
export const setCounterAction = createAction('[APP] setCounterAction', props<{counter: number}>());
