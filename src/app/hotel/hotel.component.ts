import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JsonDataService } from '../services/json/json-data.service';
import { ShareClubNameService } from '../services/shareData/share-data.service';
import { TopNavComponent } from '../top-nav/top-nav.component';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [
    CommonModule,
    TopNavComponent,
    RouterLink
  ],
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent {

  hotel: any;
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
    const hotelName = this.activateRoute.snapshot.paramMap.get('name') as string;
    this.currentClubNameSer.selectedClub.subscribe({
      next: (clubName) => {
        console.log(clubName);
        jsonData.placeJsonData(clubName, 'hotels').subscribe({
          next: (nextPara) => {
            console.log(nextPara);
            console.log(hotelName);

            console.log(nextPara[hotelName]);
            this.hotel = nextPara[hotelName];
            const descriptionParagraph = this.hotel.description as string;

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

  viewInMap(hotelName: string){
    this.router.navigate(['home', 'hotels', hotelName]);
  }

  redirectToWebsite(website: string){
    window.open(website, "_blank");
  }

  callPhoneNumber(phoneNumber: string) {
    window.location.href = "tel:" + phoneNumber;
  }


}
