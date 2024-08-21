import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecruiterComponent } from './create-recruiter.component';

describe('CreateRecruiterComponent', () => {
  let component: CreateRecruiterComponent;
  let fixture: ComponentFixture<CreateRecruiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
