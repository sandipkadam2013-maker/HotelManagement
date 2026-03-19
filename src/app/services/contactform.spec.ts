import { TestBed } from '@angular/core/testing';

import { Contactform } from './contactform';

describe('Contactform', () => {
  let service: Contactform;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Contactform);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
