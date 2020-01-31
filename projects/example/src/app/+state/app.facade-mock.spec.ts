import { Injectable } from '@angular/core';
import { FacadeMock } from '@nemocontra/ngrx-facade-mock';
import { AppFacade } from './app.facade';

@Injectable()
export class AppFacadeMock extends FacadeMock(AppFacade) {
  mockCounter$$ = this.createFacadeMockSubject(this.counter$, 0);

  increment = jasmine.createSpy('increment');
  decrement = jasmine.createSpy('decrement');
  setCounter = jasmine.createSpy('setCounter');
}
