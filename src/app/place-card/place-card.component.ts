import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { JsonDataService } from '../services/json/json-data.service';

@Component({
  selector: 'place-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss']
})
export class PlaceCardComponent {
  placeInfo!: any;
  isWholeCardShown: boolean = false;

  @ViewChild('placeIntro') placeIntroRef!: ElementRef<HTMLElement>;

  @Output('showCard') showCard: EventEmitter<number> = new EventEmitter() ;
  @Output('showCardHeader') showCardHeader: EventEmitter<number> = new EventEmitter() ;
  @Output('hideCard') hideCard: EventEmitter<number> = new EventEmitter() ;

  constructor(public jsonData: JsonDataService){}

  getPlaceInfo(clubName: string, placeType: string, placeName: string){
    this.jsonData.placeJsonData(clubName, placeType).subscribe({
      next: result =>{

        console.log(result);
        

        this.placeInfo = result[placeName];

        setTimeout(() => { this.getPlaceInfoHeight() }, 50);//! Change The Height By The Content From JSON SOLUTION.

      }
    });
  }

  getPlaceInfoHeight(){
    const PlaceIntroEle = this.placeIntroRef?.nativeElement;
    const placeIntroHeight = PlaceIntroEle?.offsetHeight;
    this.showCardHeader.emit(placeIntroHeight);
  }

  toggleCardVisibility(){
    this.isWholeCardShown = !this.isWholeCardShown;
    if(this.isWholeCardShown) this.showCard.emit();
    else this.getPlaceInfoHeight()
  }

  hideComponent(event: Event){
    event.stopPropagation();
    this.hideCard.emit();
  }

}
