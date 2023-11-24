import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [
  ]
})
export class LoadingComponent implements OnInit {

  show = false;
  private subs!: Subscription;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.select('ui')
      .subscribe((ui) => this.show = ui.isLoading);

  }
  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
