import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { placeWholeInfo } from '../common/types/placeWholeInfo';
import { placesWholeInfo } from '../common/types/placesWholeInfo';
import { JsonDataService } from '../services/json/json-data.service';
import { ShareClubNameService } from '../services/shareData/share-data.service';
import { TopNavComponent } from '../top-nav/top-nav.component';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [
    CommonModule,
    TopNavComponent,
    BottomNavComponent,
    RouterLink
  ],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})

export class HotelsComponent implements OnDestroy {
  response?: string;
  hotels: placeWholeInfo[] = [];
  subscriptionToCollectedObs!: Subscription;
  subscriptionToRecentClubName!: Subscription;

  constructor(
    public jsonData: JsonDataService,
    private currentClubNameSer: ShareClubNameService
  ){

    this.subscriptionToRecentClubName = this.currentClubNameSer.selectedClub.subscribe({
      next: (selectedClubName) => { this.getData(selectedClubName) }
    })

  }

  getData(clubName: string = 'Manchester United'){

    let collectedObsForHotelsData = this.jsonData.placeJsonData(clubName, 'hotels');

    this.subscriptionToCollectedObs = collectedObsForHotelsData.subscribe({
      next: (clubHotels : placesWholeInfo) => {

        this.hotels = [];

        this.hotels = Object.values(clubHotels);

      }
    });

  }

  clubNameSelected(clubsName: string){
    this.getData(clubsName);
  }

  ngOnDestroy(){
    this.subscriptionToCollectedObs.unsubscribe();
    this.subscriptionToRecentClubName.unsubscribe();
  }

}
