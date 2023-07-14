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
  selector: 'app-restaurants',
  standalone: true,
  imports: [
    CommonModule,
    TopNavComponent,
    BottomNavComponent,
    RouterLink
  ],
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})

export class RestaurantsComponent  implements OnDestroy {
  restaurants: placeWholeInfo[] = [];
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

    let collectedObsForRestaurantsData = this.jsonData.placeJsonData(clubName, 'restaurants');

    this.subscriptionToCollectedObs = collectedObsForRestaurantsData.subscribe({
      next: (clubRestaurants : placesWholeInfo) => {

        this.restaurants = [];

        this.restaurants = Object.values(clubRestaurants);

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
//! <!-- Make The ngOndestroy Shared Some How -->
