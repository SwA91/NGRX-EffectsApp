import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, delay, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as actions from 'src/app/store/actions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'https://reqres.in/api';

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) { }

  getUsers() {

    return this.http.get(`${this.url}/users?per_page=6`).pipe(
      tap(() => this.store.dispatch(actions.isLoading())),
      delay(3000),
      map((resp: any) => resp['data']),
    );
  }

  getUserById(id: string) {

    if(!id) return throwError(()=> new Error('id invalid'));

    return this.http.get(`${this.url}/users/${id}`).pipe(
      tap(() => this.store.dispatch(actions.isLoading())),
      delay(3000),
      map((resp: any) => resp['data'])
    );
  }
}
