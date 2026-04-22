import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDescription } from './book-description';

describe('BookDescription', () => {
  let component: BookDescription;
  let fixture: ComponentFixture<BookDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDescription],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDescription);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
