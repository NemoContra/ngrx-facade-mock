import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import { selectCounter, selectLoading } from './app.selectors';
import { decrementAction, hideLoadingAction, incrementAction, setCounterAction } from './app.actions';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {
  constructor(private store: Store<AppState>) { }

  loading$: Observable<boolean> = this.store.pipe(
    select(selectLoading)
  );

  counter$: Observable<number> = this.store.pipe(
    select(selectCounter)
  );

  hideLoading(): void {
    this.store.dispatch(hideLoadingAction());
  }

  increment(): void {
    this.store.dispatch(incrementAction());
  }

  decrement(): void {
    this.store.dispatch(decrementAction());
  }

  setCounter(counter: number): void {
    this.store.dispatch(setCounterAction({counter}));
  }
}
