import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { clubsNames } from '../common/clubsNames';





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
  selectedClubName: string = "Manchester United";
  @Output() clubNameSelected: EventEmitter<any> = new EventEmitter();
  clubsNames: string[] = clubsNames;

  constructor(public translate: TranslateService) {}

  clubSelected(selectedClubName: any){
    this.clubNameSelected.emit(selectedClubName);
  }

}




