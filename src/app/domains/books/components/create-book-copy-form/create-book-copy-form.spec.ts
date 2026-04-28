import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookCopyForm } from './create-book-copy-form';

describe('CreateBookCopyForm', () => {
  let component: CreateBookCopyForm;
  let fixture: ComponentFixture<CreateBookCopyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBookCopyForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBookCopyForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
