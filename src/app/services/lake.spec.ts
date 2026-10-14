import { TestBed } from '@angular/core/testing';
import { LakeService } from '../services/lake';

describe('LakeService', () => {
  let service: LakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
