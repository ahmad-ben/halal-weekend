import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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

  mosque: any;
  showWholeDescription: boolean = false;
  shortDescription?: boolean;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    public jsonData: JsonDataService,
    private currentClubName: ShareClubNameService,
  ){
    this.activateRoute.params.subscribe({
      next: (urlParams) => {
        console.log(urlParams);

      }
    })
    const mosqueName = this.activateRoute.snapshot.paramMap.get('name') as string;
    this.currentClubName.selectedClub.subscribe({
      next: (clubName) => {
        console.log(clubName);
        jsonData.placeJsonData(clubName, 'mosques').subscribe({
          next: (nextPara) => {
            console.log(nextPara);
            console.log(mosqueName);

            console.log(nextPara[mosqueName]);
            this.mosque = nextPara[mosqueName];
            const descriptionParagraph = this.mosque.description as string;

            if(descriptionParagraph.length < 100) this.shortDescription = true;

          }
        })
      }
    })

  }

  clubNameSelected(clubName: string){
    this.currentClubName.changeSelectedClub(clubName);
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

}
