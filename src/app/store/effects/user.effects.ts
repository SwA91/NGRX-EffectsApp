import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, take } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import * as usersActions from '../actions';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private usersService: UsersService
    ) { }

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            // filter the actions
            ofType(usersActions.loadUser),
            mergeMap(
                // call the service needed
                (action) => this.usersService.getUserById(action.id)
                    .pipe(
                        map((user) => usersActions.loadUserSuccess({ user })),
                        // catch error and return the observable of()
                        catchError(err => of(usersActions.loadUserError({ payload: err })))
                    )
            )
        )
    );

}