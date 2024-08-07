import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Talentpool2Component } from './talentpool2.component';

describe('Talentpool2Component', () => {
  let component: Talentpool2Component;
  let fixture: ComponentFixture<Talentpool2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Talentpool2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Talentpool2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
