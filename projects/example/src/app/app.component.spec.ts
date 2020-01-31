import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugHTMLElement, FacadeMockModule } from '@nemocontra/ngrx-facade-mock';
import { AppState, initialAppState } from './+state/app.reducers';
import { AppFacade } from './+state/app.facade';
import { AppFacadeMock } from './+state/app.facade-mock.spec';
import { By } from '@angular/platform-browser';
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
    const h1Element: DebugHTMLElement<HTMLHeadElement> = fixture.debugElement.query(By.css('h1'));
    expect(h1Element.nativeElement.textContent).toEqual('Counter');

    const pElement: DebugHTMLElement<HTMLParagraphElement> = fixture.debugElement.query(By.css('p'));
    expect(pElement.nativeElement.textContent).toEqual('Counter value: 0');
  });

  it('should show the correct counter value', () => {
    appFacadeMock.mockCounter$$.next(10);
    fixture.detectChanges();

    const pElement: DebugHTMLElement<HTMLParagraphElement> = fixture.debugElement.query(By.css('p'));
    expect(pElement.nativeElement.textContent).toEqual('Counter value: 10');

    appFacadeMock.mockCounter$$.next(99);
    fixture.detectChanges();

    expect(pElement.nativeElement.textContent).toEqual('Counter value: 99');

    appFacadeMock.mockCounter$$.next(-42);
    fixture.detectChanges();

    expect(pElement.nativeElement.textContent).toEqual('Counter value: -42');
  });

  it('increment the counter', () => {
    const incrementButton: DebugHTMLElement<HTMLButtonElement> = fixture.debugElement.queryAll(By.css('button'))[0];

    incrementButton.nativeElement.click();

    expect(appFacadeMock.increment).toHaveBeenCalledTimes(1);
  });

  it('decrement the counter', () => {
    const decrementButton: DebugHTMLElement<HTMLButtonElement> = fixture.debugElement.queryAll(By.css('button'))[1];

    decrementButton.nativeElement.click();

    expect(appFacadeMock.decrement).toHaveBeenCalledTimes(1);
  });

  it('set the counter', () => {
    const setCounterInput: DebugHTMLElement<HTMLInputElement> = fixture.debugElement.query(By.css('input'));
    const setCounterButton: DebugHTMLElement<HTMLButtonElement> = fixture.debugElement.queryAll(By.css('button'))[2];

    setCounterInput.nativeElement.value = '20';
    setCounterInput.nativeElement.dispatchEvent(new Event('input'));
    setCounterButton.nativeElement.click();

    expect(appFacadeMock.setCounter).toHaveBeenCalledTimes(1);
    expect(appFacadeMock.setCounter).toHaveBeenCalledWith(20);
  });
});
