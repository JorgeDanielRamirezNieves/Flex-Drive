import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivechatsComponent } from './activechats.component';

describe('ActivechatsComponent', () => {
  let component: ActivechatsComponent;
  let fixture: ComponentFixture<ActivechatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivechatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivechatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
