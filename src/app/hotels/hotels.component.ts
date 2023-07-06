import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
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
export class HotelsComponent {
  response?: string;
  hotels: any[] = [];

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

    this.jsonData.placeJsonData(clubName, 'hotels').subscribe({
      next: (response) => {
        this.response = response;

        const hotelsName = Object.keys(response);

        this.hotels = [];
        hotelsName.forEach(hotelName => {
          this.hotels.push(response[hotelName]);

        })

      }
    });

  }

  showOneHotelInfo(hotelName: string){ }

  clubNameSelected(clubsName: string){
    this.getData(clubsName);
  }

}
