import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksReadCard } from './books-read-card';

describe('BooksReadCard', () => {
  let component: BooksReadCard;
  let fixture: ComponentFixture<BooksReadCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksReadCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksReadCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
