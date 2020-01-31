import { Component, OnInit } from '@angular/core';
import { AppFacade } from './+state/app.facade';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean> = this.appFacade.loading$;

  counter$: Observable<number> = this.appFacade.counter$;

  counterFormGroup = new FormGroup({
    counterInput: new FormControl()
  });

  constructor(private appFacade: AppFacade) {
  }

  ngOnInit(): void {
    this.appFacade.hideLoading();
  }

  onIncrement(): void {
    this.appFacade.increment();
  }

  onDecrement(): void {
    this.appFacade.decrement();
  }

  setCounter(value: string): void {
    this.appFacade.setCounter(+value);
  }
}
