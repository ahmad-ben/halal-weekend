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
  selector: 'app-mosque',
  standalone: true,
  imports: [
    CommonModule,
    TopNavComponent,
    RouterLink
  ],
  templateUrl: './mosque.component.html',
  styleUrls: ['./mosque.component.scss']
})
export class MosqueComponent {

  mosque?: placeWholeInfo;
  subscriptionOneMosqueData!: Subscription;
  shortDescription?: boolean;
  showWholeDescription: boolean = false;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    public jsonData: JsonDataService,
    private currentClubNameSer: ShareClubNameService,
  ){
    const mosqueName = this.activateRoute.snapshot.paramMap.get('name') as string;

    let obsForOneMosqueData =  this.currentClubNameSer.selectedClub.pipe(
      switchMap((selectedClubName) =>

          jsonData.placeJsonData(selectedClubName ,'mosques').pipe(
          map((clubMosques : placesWholeInfo) => clubMosques[mosqueName]
          )

        ))
    )

    this.subscriptionOneMosqueData = obsForOneMosqueData.subscribe(oneMosqueWholeData =>{
      this.mosque = oneMosqueWholeData;
      this.checkDescriptionLength(this.mosque.description.length);
    })

  }

  checkDescriptionLength(descriptionLength : number){
    if(descriptionLength < 100) this.shortDescription = true;
  }

  clubNameSelected(clubName: string){
    this.currentClubNameSer.changeSelectedClub(clubName);
    this.router.navigate(['home']);
  }

  viewInMap(mosqueName: string){
    this.router.navigate(['home', 'mosques', mosqueName]);
  }

  redirectToWebsite(website: string){
    window.open(website, "_blank");
  }

  callPhoneNumber(phoneNumber: string) {
    window.location.href = "tel:" + phoneNumber;
  }

  ngOnDestroy(){
    this.subscriptionOneMosqueData?.unsubscribe();
  }

}
