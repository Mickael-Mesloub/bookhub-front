import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnBookForm } from './return-book-form';

describe('ReturnBookForm', () => {
  let component: ReturnBookForm;
  let fixture: ComponentFixture<ReturnBookForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnBookForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnBookForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
