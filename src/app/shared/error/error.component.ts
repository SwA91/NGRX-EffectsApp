import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: [
  ]
})
export class ErrorComponent implements OnInit, OnDestroy {
  show = false;
  error: any;
  private subs!: Subscription;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.select('error')
      .subscribe(({ error, hasError }) => {
        this.show = hasError;
        this.error = error;
      });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

}
