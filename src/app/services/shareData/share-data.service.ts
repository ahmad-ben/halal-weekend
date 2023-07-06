import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShareClubNameService {

  selectedClub = new BehaviorSubject('Manchester United');

  constructor() { }

  changeSelectedClub(clubName: string) {
    console.log("Share Data Message: ", clubName);

    this.selectedClub.next(clubName);
  }

}
