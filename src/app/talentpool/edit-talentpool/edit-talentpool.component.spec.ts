import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTalentpoolComponent } from './edit-talentpool.component';

describe('EditTalentpoolComponent', () => {
  let component: EditTalentpoolComponent;
  let fixture: ComponentFixture<EditTalentpoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTalentpoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTalentpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
