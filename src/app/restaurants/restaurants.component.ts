import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
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
export class RestaurantsComponent {
  response?: string;
  restaurants: any[] = [];

  constructor(
    public jsonData: JsonDataService,
    private currentClubName: ShareClubNameService
    ){

      this.currentClubName.selectedClub.subscribe({
        next: (clubName) => {
          console.log(clubName);
          this.getData(clubName);

        }
      })

    }

  getData(clubName: string = 'Manchester United'){

    this.jsonData.placeJsonData(clubName, 'restaurants').subscribe({
      next: (response) => {
        this.response = response;

        const restaurantsName = Object.keys(response);

        this.restaurants = [];
        restaurantsName.forEach(restaurantName => {
          this.restaurants.push(response[restaurantName]);

        })

      }
    });

  }

  clubNameSelected(clubsName: string){
    this.getData(clubsName);
  }
}
