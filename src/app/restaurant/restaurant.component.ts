import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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

  restaurant: any;
  showWholeDescription: boolean = false;
  shortDescription?: boolean;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    public jsonData: JsonDataService,
    private currentClubNameSer: ShareClubNameService,
  ){
    this.activateRoute.params.subscribe({
      next: (urlParams) => {
        console.log(urlParams);

      }
    })
    const restaurantName = this.activateRoute.snapshot.paramMap.get('name') as string;
    this.currentClubNameSer.selectedClub.subscribe({
      next: (clubName) => {
        console.log(clubName);
        jsonData.placeJsonData(clubName, 'restaurants').subscribe({
          next: (nextPara) => {
            console.log(nextPara);
            console.log(restaurantName);

            console.log(nextPara[restaurantName]);
            this.restaurant = nextPara[restaurantName];
            const descriptionParagraph = this.restaurant.description as string;

            if(descriptionParagraph.length < 100) this.shortDescription = true;

          }
        })
      }
    })

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

}
