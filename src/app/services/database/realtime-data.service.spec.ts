import { TestBed } from '@angular/core/testing';
import { RealtimeSaveUserInfoService } from './realtime-data.service';


describe('RealtimeSaveUserInfoService', () => {
  let service: RealtimeSaveUserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeSaveUserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
