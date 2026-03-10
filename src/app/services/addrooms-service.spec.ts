import { TestBed } from '@angular/core/testing';

import { AddroomsService } from './addrooms-service';

describe('AddroomsService', () => {
  let service: AddroomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddroomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
