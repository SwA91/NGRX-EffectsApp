import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from '../actions';

export interface ErrorState {
    error: any;
    hasError: boolean;
}

export const initialState: ErrorState = {
    error: null,
    hasError: false,
}

const _errorReducer = createReducer(initialState,

    on(Actions.showError, (state, { payload }) => ({
        ...state,
        error: payload,
        hasError: true,
    })),
    on(Actions.hideError, state => ({
        ...state,
        error: null,
        hasError: false
    })),

);

export function errorReducer(state: ErrorState | undefined, action: Action) {
    return _errorReducer(state, action);
}