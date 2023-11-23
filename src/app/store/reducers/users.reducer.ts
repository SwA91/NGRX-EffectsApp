import { createReducer, on } from '@ngrx/store';
import * as Actions from '../actions';
import { UserModel } from 'src/app/models/user.mode';

export interface UsersState {
    users: UserModel[],
    loaded: boolean,
    loading: boolean,
    error: any,
}

export const userInitialState: UsersState = {
    users: [],
    loaded: false,
    loading: false,
    error: null,
}

const _usersReducer = createReducer(userInitialState,

    on(Actions.loadUsers, state => ({ ...state, loading: true })),

    on(Actions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        loading: false,
        loaded: true,
        users: [...users]
    })),

    on(Actions.loadUsersError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),
);

export function usersReducer(state: any, action: any) {
    return _usersReducer(state, action);
}