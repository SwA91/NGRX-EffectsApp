import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.mode';
import * as actions from 'src/app/store/actions';
import { loadUsers } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit, OnDestroy {

  users: UserModel[] = [];
  private subs!: Subscription;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {

    this.subs = this.store.select('users')
      .subscribe(({ users, payload }) => {

        this.store.dispatch(actions.stopLoading());
        this.users = users;

        if (payload) {
          this.store.dispatch(actions.showError({ payload }));
        } else {
          this.store.dispatch(actions.hideError());
        }

        this.store.dispatch(actions.clearUser());

      });

    this.store.dispatch(loadUsers());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
