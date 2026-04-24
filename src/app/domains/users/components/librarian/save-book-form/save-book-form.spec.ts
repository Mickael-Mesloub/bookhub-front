import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBookForm } from './save-book-form';

describe('SaveBookForm', () => {
  let component: SaveBookForm;
  let fixture: ComponentFixture<SaveBookForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveBookForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveBookForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
