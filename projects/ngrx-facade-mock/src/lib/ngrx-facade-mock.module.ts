import { DebugElement, ModuleWithProviders, NgModule, Provider, Type } from '@angular/core';
import { MockStoreConfig, provideMockStore } from '@ngrx/store/testing';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DebugHTMLElement<T extends HTMLElement> extends DebugElement {
  nativeElement: T;
}

export interface DebugComponentElement<T extends Type<any>> extends DebugElement {
  componentInstance: T;
}

export function FacadeMock<TBase extends Type<any>>(base: TBase) {
  return class extends base {
    public createFacadeMockSubject<V>(
      source: Observable<V>,
      value: V
    ): BehaviorSubject<V> {
      const facadeMockSubject = new BehaviorSubject<V>(value);

      for (const key in this) {
        if (this[key] === source) {
          Object.assign(this, {
            [key]: facadeMockSubject.asObservable()
          });
        }
      }

      return facadeMockSubject;
    }
  };
}

export interface FacadeMockConfig {
  originalFacade: Type<any>;
  mockFacade: Type<any>;
}

export interface FacadeMockModuleConfig<TStoreConfig> {
  mockStoreConfig?: MockStoreConfig<TStoreConfig>;
  facadeMocks: ReadonlyArray<FacadeMockConfig>;
}

@NgModule()
export class FacadeMockModule {
  public static withMockStore<T>({ mockStoreConfig, facadeMocks }:
                                    FacadeMockModuleConfig<T>): ModuleWithProviders<FacadeMockModule> {
    return {
      ngModule: FacadeMockModule,
      providers: [provideMockStore<T>(mockStoreConfig || {}), ...createProviders(facadeMocks)]
    };
  }
}

function* createProviders(facadeMocks: ReadonlyArray<FacadeMockConfig>): IterableIterator<Provider> {
  for (const { originalFacade, mockFacade } of facadeMocks) {
    yield { provide: originalFacade, useClass: mockFacade };
    yield { provide: mockFacade, useExisting: originalFacade };
  }
}
