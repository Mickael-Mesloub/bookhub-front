import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBookPage } from './save-book-page';

describe('SaveBookPage', () => {
  let component: SaveBookPage;
  let fixture: ComponentFixture<SaveBookPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveBookPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveBookPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
