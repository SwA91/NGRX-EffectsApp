import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.mode';
import * as actions from 'src/app/store/actions';
import { loadUser } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit, OnDestroy {

  user!: UserModel | null;
  private subs!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.subs = this.store.select('user')
      .subscribe(({ user, payload }) => {

        this.store.dispatch(actions.stopLoading());
        this.user = user;

        if (payload) {
          this.store.dispatch(actions.showError({ payload }));
        } else {
          this.store.dispatch(actions.hideError());
        }

        this.store.dispatch(actions.clearUsers());
      });

    this.route.params.subscribe(({ id }) => {
      if (id) this.store.dispatch(loadUser({ id }))
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
