import { createReducer, on } from '@ngrx/store';
import * as Actions from '../actions';
import { UserModel } from 'src/app/models/user.mode';

export interface UsersState {
    users: UserModel[],
    payload: any,
}

export const usersInitialState: UsersState = {
    users: [],
    payload: null,
}

const _usersReducer = createReducer(usersInitialState,

    on(Actions.loadUsers, (state): UsersState => ({ ...state })),

    on(Actions.clearUsers, (state): UsersState => ({
        ...state,
        users: [],
        payload: null,
    })),

    on(Actions.loadUsersSuccess, (state, { users }): UsersState => ({
        ...state,
        payload: null,
        users: [...users]
    })),

    on(Actions.loadUsersError, (state, { payload }): UsersState => ({
        ...state,
        users: [],
        payload: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        },
    })),
);

export function usersReducer(state: any, action: any) {
    return _usersReducer(state, action);
}