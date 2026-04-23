import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanBook } from './loan-book';

describe('LoanBook', () => {
  let component: LoanBook;
  let fixture: ComponentFixture<LoanBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanBook],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanBook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
