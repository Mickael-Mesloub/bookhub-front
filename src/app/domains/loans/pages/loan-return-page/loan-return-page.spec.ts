import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanReturnPage } from './loan-return-page';

describe('LoanReturnPage', () => {
  let component: LoanReturnPage;
  let fixture: ComponentFixture<LoanReturnPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanReturnPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanReturnPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
