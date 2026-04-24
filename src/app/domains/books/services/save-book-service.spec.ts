import { TestBed } from '@angular/core/testing';

import { SaveBookService } from './save-book-service';

describe('SaveBookService', () => {
  let service: SaveBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
