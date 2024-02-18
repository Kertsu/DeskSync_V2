import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessResetComponent } from './success-reset.component';

describe('SuccessResetComponent', () => {
  let component: SuccessResetComponent;
  let fixture: ComponentFixture<SuccessResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessResetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
