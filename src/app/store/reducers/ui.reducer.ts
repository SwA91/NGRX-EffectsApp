import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from '../actions';

export interface UiState {
    isLoading: boolean;
}

export const initialUiState: UiState = {
    isLoading: false,
}

const _uiReducer = createReducer(initialUiState,

    on(Actions.isLoading, state => ({ ...state, isLoading: true })),
    on(Actions.stopLoading, state => ({ ...state, isLoading: false })),

);

export function uiReducer(state: UiState | undefined, action: Action) {
    return _uiReducer(state, action);
}