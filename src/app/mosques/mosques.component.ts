import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
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
export class MosquesComponent {
  response?: string;
  mosques: any[] = [];

  constructor(
    public jsonData: JsonDataService,
    private currentClubNameSer: ShareClubNameService
    ){

      this.currentClubNameSer.selectedClub.subscribe({
        next: (clubName) => {
          console.log(clubName);
          this.getData(clubName);

        }
      })

    }

  getData(clubName: string = 'Manchester United'){

    this.jsonData.placeJsonData(clubName, 'mosques').subscribe({
      next: (response) => {
        this.response = response;

        const mosquesName = Object.keys(response);

        this.mosques = [];
        mosquesName.forEach(mosqueName => {
          this.mosques.push(response[mosqueName]);

        })

      }
    });

  }

  clubNameSelected(clubsName: string){
    this.getData(clubsName);
  }
}
