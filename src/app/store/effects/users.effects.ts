import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of } from 'rxjs';
import { map, mergeMap, take } from "rxjs/operators";
import { UsersService } from 'src/app/services/users.service';
import * as usersActions from '../actions';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private usersService: UsersService
    ) { }

    loadUsers$ = createEffect(() => this.actions$.pipe(
        // filter the actions
        ofType(usersActions.loadUsers),
        mergeMap(() => {
            // call the service needed
            return this.usersService.getUsers()
                .pipe(
                    map((users) => usersActions.loadUsersSuccess({ users })),
                    // catch error and return the observable of()
                    catchError(err => of(usersActions.loadUsersError({ payload: err })))
                )
        })
    ));

}