import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDesksComponent } from './manage-desks.component';

describe('ManageDesksComponent', () => {
  let component: ManageDesksComponent;
  let fixture: ComponentFixture<ManageDesksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDesksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageDesksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
