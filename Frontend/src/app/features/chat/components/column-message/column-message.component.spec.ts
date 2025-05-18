import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnMessageComponent } from './column-message.component';

describe('ColumnMessageComponent', () => {
  let component: ColumnMessageComponent;
  let fixture: ComponentFixture<ColumnMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
