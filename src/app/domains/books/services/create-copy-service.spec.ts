import { TestBed } from '@angular/core/testing';

import { CreateCopyService } from './create-copy-service';

describe('CreateCopyService', () => {
  let service: CreateCopyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCopyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
