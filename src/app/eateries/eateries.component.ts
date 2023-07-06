import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { JsonDataService } from '../services/json/json-data.service';
import { ShareClubNameService } from '../services/shareData/share-data.service';
import { TopNavComponent } from '../top-nav/top-nav.component';

@Component({
  selector: 'app-eateries',
  standalone: true,
  imports: [
    CommonModule,
    TopNavComponent,
    BottomNavComponent
  ],
  templateUrl: './eateries.component.html',
  styleUrls: ['./eateries.component.scss']
})
export class EateriesComponent {
  response?: string;
  eateries: any[] = [];

  constructor(
    public jsonData: JsonDataService,
    private currentClubName: ShareClubNameService
    ){ }

  getData(clubName: string = 'Manchester United'){

    this.jsonData.placeJsonData(clubName, 'eateries').subscribe({
      next: (response) => {
        this.response = response;

        const eateriesName = Object.keys(response);

        this.eateries = [];
        eateriesName.forEach(eateryName => {
          this.eateries.push(response[eateryName]);

        })

      }
    });

  }

  clubNameSelected(clubsName: string){
    this.getData(clubsName);
  }
}
