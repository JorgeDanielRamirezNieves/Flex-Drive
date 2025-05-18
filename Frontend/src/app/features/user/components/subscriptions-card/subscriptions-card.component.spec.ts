import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsCardComponent } from './subscriptions-card.component';

describe('SubscriptionsCardComponent', () => {
  let component: SubscriptionsCardComponent;
  let fixture: ComponentFixture<SubscriptionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriptionsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
