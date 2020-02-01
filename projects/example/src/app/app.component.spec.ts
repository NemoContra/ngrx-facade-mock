import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FacadeMockModule, getAllByCss, getByCss } from '@nemocontra/ngrx-facade-mock';
import { AppState, initialAppState } from './+state/app.reducers';
import { AppFacade } from './+state/app.facade';
import { AppFacadeMock } from './+state/app.facade-mock.spec';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  let appFacadeMock: AppFacadeMock;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        ReactiveFormsModule,
        FacadeMockModule.withMockStore<{app: AppState}>({
          mockStoreConfig: {
            initialState: {
              app: {
                ...initialAppState,
                loading: false
              }
            }
          },
          facadeMocks: [
            {
              originalFacade: AppFacade,
              mockFacade: AppFacadeMock
            }
          ]
        })
      ]
    }).compileComponents();

    appFacadeMock = TestBed.get<AppFacadeMock>(AppFacadeMock);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should show the initial value of 0', () => {
    expect(getByCss(fixture, 'h1').nativeElement.textContent).toEqual('Counter');
    expect(getByCss(fixture, 'p').nativeElement.textContent).toEqual('Counter value: 0');
  });

  it('should show the correct counter value', () => {
    appFacadeMock.mockCounter$$.next(10);
    fixture.detectChanges();
    expect(getByCss(fixture, 'p').nativeElement.textContent).toEqual('Counter value: 10');

    appFacadeMock.mockCounter$$.next(99);
    fixture.detectChanges();
    expect(getByCss(fixture, 'p').nativeElement.textContent).toEqual('Counter value: 99');

    appFacadeMock.mockCounter$$.next(-42);
    fixture.detectChanges();
    expect(getByCss(fixture, 'p').nativeElement.textContent).toEqual('Counter value: -42');
  });

  it('increment the counter', () => {
    getAllByCss(fixture, 'button')[0].nativeElement.click();
    expect(appFacadeMock.increment).toHaveBeenCalledTimes(1);
  });

  it('decrement the counter', () => {
    getAllByCss(fixture, 'button')[1].nativeElement.click();
    expect(appFacadeMock.decrement).toHaveBeenCalledTimes(1);
  });

  it('set the counter', () => {
    getByCss(fixture, 'input').nativeElement.value = '20';
    getAllByCss(fixture, 'button')[2].nativeElement.dispatchEvent(new Event('input'));
    getAllByCss(fixture, 'button')[2].nativeElement.click();

    expect(appFacadeMock.setCounter).toHaveBeenCalledTimes(1);
    expect(appFacadeMock.setCounter).toHaveBeenCalledWith(20);
  });
});
