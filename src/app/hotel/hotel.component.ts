import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, map, switchMap } from 'rxjs';
import { placeWholeInfo } from '../common/types/placeWholeInfo';
import { placesWholeInfo } from '../common/types/placesWholeInfo';
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

export class HotelComponent implements OnDestroy {

  hotel?: placeWholeInfo;
  subscriptionOneHotelData!: Subscription;
  shortDescription?: boolean;
  showWholeDescription: boolean = false;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    public jsonData: JsonDataService,
    private currentClubNameSer: ShareClubNameService,
  ){
    const hotelName = this.activateRoute.snapshot.paramMap.get('name') as string;

    let obsForOneHotelData =  this.currentClubNameSer.selectedClub.pipe(
      switchMap((selectedClubName) =>

          jsonData.placeJsonData(selectedClubName ,'hotels').pipe(
          map((clubHotels : placesWholeInfo) => clubHotels[hotelName]
          )

        ))
    )

    this.subscriptionOneHotelData = obsForOneHotelData.subscribe(oneHotelWholeData =>{
      this.hotel = oneHotelWholeData;
      this.checkDescriptionLength(this.hotel.description.length);
    })

  }

  checkDescriptionLength(descriptionLength : number){
    if(descriptionLength < 100) this.shortDescription = true;
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

  ngOnDestroy(){
    this.subscriptionOneHotelData.unsubscribe();
  }

}



