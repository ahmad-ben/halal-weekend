import { TestBed } from '@angular/core/testing';
import { RealtimeShareClubNameService } from './realtime-data.service';


describe('RealtimeShareClubNameService', () => {
  let service: RealtimeShareClubNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeShareClubNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
