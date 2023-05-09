import { TestBed } from '@angular/core/testing';
import { RealtimeDataService } from './realtime-data.service';


describe('RealtimeDataService', () => {
  let service: RealtimeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
