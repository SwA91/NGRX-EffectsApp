import { createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.mode';
import * as Actions from '../actions';

export interface UserState {
    id: string | null,
    user: UserModel | null,
    payload: any,
}

export const userInitialState: UserState = {
    id: null,
    user: null,
    payload: null,
}

const _userReducer = createReducer(userInitialState,

    on(Actions.loadUser, (state, { id }) => ({
        ...state,
        id: id,
        user: null,
        payload: null,
    })),

    on(Actions.clearUser, (state): UserState => ({
        ...state,
        id: null,
        user: null,
        payload: null,
    })),

    on(Actions.loadUserSuccess, (state, { user }): UserState => ({
        ...state,
        user: { ...user },
        payload: null,
    })),

    on(Actions.loadUserError, (state, { payload }): UserState => ({
        ...state,
        id: null,
        user: null,
        payload: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),
);

export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}