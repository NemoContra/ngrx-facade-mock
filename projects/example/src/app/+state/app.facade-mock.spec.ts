import { Injectable } from '@angular/core';
import { FacadeMock } from '../../../../ngrx-facade-mock/src/lib/ngrx-facade-mock.module';
import { AppFacade } from './app.facade';

@Injectable()
export class AppFacadeMock extends FacadeMock(AppFacade) {
  mockCounter$$ = this.createFacadeMockSubject(this.counter$, 0);

  increment = jasmine.createSpy('increment');
  decrement = jasmine.createSpy('decrement');
  setCounter = jasmine.createSpy('setCounter');
}
