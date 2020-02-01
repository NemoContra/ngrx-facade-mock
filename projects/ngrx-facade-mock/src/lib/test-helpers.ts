import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export interface HTMLDebugElement<T> extends DebugElement {
  nativeElement: T;
}

export interface ComponentDebugElement<T> extends DebugElement {
  componentInstance: T;
}

export function getByCss<K extends keyof HTMLElementTagNameMap>(
  fixture: ComponentFixture<any>,
  selector: K): HTMLDebugElement<HTMLElementTagNameMap[K]> {
  return fixture.debugElement.query(By.css(selector));
}

export function getAllByCss<K extends keyof HTMLElementTagNameMap>(
  fixture: ComponentFixture<any>,
  selector: K
): ReadonlyArray<HTMLDebugElement<HTMLElementTagNameMap[K]>> {
  return fixture.debugElement.queryAll(By.css(selector));
}

export function getByDirective<T>(fixture: ComponentFixture<any>, selector: Type<any>): ComponentDebugElement<T> {
  return fixture.debugElement.query(By.directive(selector));
}

export function getAllByDirective<T>(fixture: ComponentFixture<any>, selector: Type<any>): ReadonlyArray<ComponentDebugElement<T>> {
  return fixture.debugElement.queryAll(By.directive(selector));
}

export function getByComponent<T>(fixture: ComponentFixture<any>, selector: Type<T>): ComponentDebugElement<T> {
  return getByDirective<T>(fixture, selector);
}

export function getAllByComponent<T>(fixture: ComponentFixture<any>, selector: Type<T>): ReadonlyArray<ComponentDebugElement<T>> {
  return getAllByDirective<T>(fixture, selector);
}
