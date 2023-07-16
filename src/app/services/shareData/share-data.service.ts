import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShareClubNameService {

  selectedClub = new BehaviorSubject('Manchester United');

  constructor() { }

  changeSelectedClub(clubName: string) { this.selectedClub.next(clubName) }

}
