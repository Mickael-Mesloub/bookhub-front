import { TestBed } from '@angular/core/testing';

import { CreateBookService } from './create-book-service';

describe('CreateBookService', () => {
  let service: CreateBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
