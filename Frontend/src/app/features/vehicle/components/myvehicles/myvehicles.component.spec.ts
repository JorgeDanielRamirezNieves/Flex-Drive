import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyvehiclesComponent } from './myvehicles.component';

describe('MyvehiclesComponent', () => {
  let component: MyvehiclesComponent;
  let fixture: ComponentFixture<MyvehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyvehiclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyvehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
