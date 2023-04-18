import { TestBed } from '@angular/core/testing';

import { MushroomService } from './mushroom.service';

describe('MushroomService', () => {
  let service: MushroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MushroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
