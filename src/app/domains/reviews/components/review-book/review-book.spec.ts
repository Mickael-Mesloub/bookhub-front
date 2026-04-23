import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBook } from './review-book';

describe('ReviewBook', () => {
  let component: ReviewBook;
  let fixture: ComponentFixture<ReviewBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewBook],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewBook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
