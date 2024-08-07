/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListtalentpoolComponent } from './listtalentpool.component';

describe('ListtalentpoolComponent', () => {
  let component: ListtalentpoolComponent;
  let fixture: ComponentFixture<ListtalentpoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtalentpoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtalentpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
