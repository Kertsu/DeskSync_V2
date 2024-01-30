import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeskUnavailabilitiesComponent } from './manage-desk-unavailabilities.component';

describe('ManageDeskUnavailabilitiesComponent', () => {
  let component: ManageDeskUnavailabilitiesComponent;
  let fixture: ComponentFixture<ManageDeskUnavailabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDeskUnavailabilitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageDeskUnavailabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
