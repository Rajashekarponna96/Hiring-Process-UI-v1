import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringflowactivityComponent } from './hiringflowactivity.component';

describe('HiringflowactivityComponent', () => {
  let component: HiringflowactivityComponent;
  let fixture: ComponentFixture<HiringflowactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringflowactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringflowactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
