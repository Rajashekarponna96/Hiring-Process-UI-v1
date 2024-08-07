import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Talentpool1Component } from './talentpool1.component';

describe('Talentpool1Component', () => {
  let component: Talentpool1Component;
  let fixture: ComponentFixture<Talentpool1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Talentpool1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Talentpool1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
