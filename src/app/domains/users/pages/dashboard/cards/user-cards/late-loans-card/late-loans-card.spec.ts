import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateLoansCard } from './late-loans-card';

describe('LateLoansCard', () => {
  let component: LateLoansCard;
  let fixture: ComponentFixture<LateLoansCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateLoansCard],
    }).compileComponents();

    fixture = TestBed.createComponent(LateLoansCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
