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
  selector: 'app-mosques',
  standalone: true,
  imports: [
    CommonModule,
    TopNavComponent,
    BottomNavComponent,
    RouterLink
  ],
  templateUrl: './mosques.component.html',
  styleUrls: ['./mosques.component.scss']
})
export class MosquesComponent  implements OnDestroy {
  response?: string;
  mosques: placeWholeInfo[] = [];
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

  getData(clubName: string){

    let collectedObsForRestaurantsData = this.jsonData.placeJsonData(clubName, 'mosques');

    this.subscriptionToCollectedObs = collectedObsForRestaurantsData.subscribe({
      next: (clubRestaurants : placesWholeInfo) => {

        this.mosques = [];

        this.mosques = Object.values(clubRestaurants);

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
