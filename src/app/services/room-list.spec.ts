import { TestBed } from '@angular/core/testing';

import { RoomList } from './room-list';

describe('RoomList', () => {
  let service: RoomList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
