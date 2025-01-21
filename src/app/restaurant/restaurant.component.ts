import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, map, switchMap } from 'rxjs';
import { placeWholeInfo } from '../common/types/placeWholeInfo';
import { placesWholeInfo } from '../common/types/placesWholeInfo';
import { JsonDataService } from '../services/json/json-data.service';
import { ShareClubNameService } from '../services/shareData/share-data.service';
import { TopNavComponent } from '../top-nav/top-nav.component';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [
    CommonModule,
    TopNavComponent,
    RouterLink
  ],
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})

export class RestaurantComponent {

  restaurant?: placeWholeInfo;
  subscriptionOneRestaurantData!: Subscription;
  shortDescription?: boolean;
  showWholeDescription: boolean = false;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    public jsonData: JsonDataService,
    private currentClubNameSer: ShareClubNameService,
  ){
    const restaurantName = this.activateRoute.snapshot.paramMap.get('name') as string;

    let obsForOneRestaurantData =  this.currentClubNameSer.selectedClub.pipe(
      switchMap((selectedClubName) =>

          jsonData.placeJsonData(selectedClubName ,'restaurants').pipe(
          map((clubRestaurants : placesWholeInfo) => clubRestaurants[restaurantName]
          )

        ))
    )

    this.subscriptionOneRestaurantData = obsForOneRestaurantData.subscribe(oneRestaurantWholeData =>{
      this.restaurant = oneRestaurantWholeData;
      this.checkDescriptionLength(this.restaurant.description.length);
    })

  }

  checkDescriptionLength(descriptionLength : number){
    if(descriptionLength < 100) this.shortDescription = true;
  }

  clubNameSelected(clubName: string){
    this.currentClubNameSer.changeSelectedClub(clubName);
    this.router.navigate(['home']);
  }

  viewInMap(restaurantName: string){
    this.router.navigate(['home', 'restaurants', restaurantName]);
  }

  redirectToWebsite(website: string){
    window.open(website, "_blank");
  }

  callPhoneNumber(phoneNumber: string) {
    window.location.href = "tel:" + phoneNumber;
  }

  ngOnDestroy(){
    this.subscriptionOneRestaurantData?.unsubscribe();
  }

}
