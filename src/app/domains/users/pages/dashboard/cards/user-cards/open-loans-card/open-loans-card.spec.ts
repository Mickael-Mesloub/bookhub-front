import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLoansCard } from './open-loans-card';

describe('OpenLoansCard', () => {
  let component: OpenLoansCard;
  let fixture: ComponentFixture<OpenLoansCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenLoansCard],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenLoansCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
