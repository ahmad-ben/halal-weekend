import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { clubsNames } from '../common/clubsNames';
import { ShareClubNameService } from '../services/shareData/share-data.service';





@Component({
  selector: 'top-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbTypeaheadModule,
    FormsModule,
    JsonPipe,
    TranslateModule
  ],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})


export class TopNavComponent {
  selectedClubName?: string;
  @Output() clubNameSelected: EventEmitter<any> = new EventEmitter();
  clubsNames: string[] = clubsNames;

  constructor(
    public translate: TranslateService,
    private currentClubName: ShareClubNameService
    ){

    this.currentClubName.selectedClub.subscribe({
      next: (nextPara) => {
        this.selectedClubName = nextPara;
        // this.clubSelected(nextPara);

      }
    })


  }

  clubSelected(selectedClubName: any){
    console.log("clubSelected Works", selectedClubName);

    this.currentClubName.changeSelectedClub(selectedClubName);

    this.clubNameSelected.emit(selectedClubName);
  }

}




