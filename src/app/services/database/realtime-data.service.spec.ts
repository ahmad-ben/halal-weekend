import { TestBed } from '@angular/core/testing';
import { RealtimeshareClubNameService } from './realtime-data.service';


describe('RealtimeshareClubNameService', () => {
  let service: RealtimeshareClubNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeshareClubNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
