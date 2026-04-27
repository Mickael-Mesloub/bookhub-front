import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookPage } from './create-book-page';

describe('CreateBookPage', () => {
  let component: CreateBookPage;
  let fixture: ComponentFixture<CreateBookPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBookPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBookPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
