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
  isCardShown: boolean = false;

  @ViewChild('placeIntro') placeIntroRef!: ElementRef<HTMLElement>;

  @Output('showCardHeader') showCardHeader: EventEmitter<number> = new EventEmitter() ;
  @Output('showCard') showCard: EventEmitter<number> = new EventEmitter() ;
  @Output('hideCard') hideCard: EventEmitter<number> = new EventEmitter() ;

  constructor(public jsonData: JsonDataService){}

  getPlaceInfo(placeName: string){
    this.jsonData.placeJsonData().subscribe({
      next: result =>{

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
    this.isCardShown = !this.isCardShown;
    if(this.isCardShown) this.showCard.emit();
    else this.getPlaceInfoHeight()
  }

  hideComponent(event: Event){
    event.stopPropagation();
    this.hideCard.emit();
  }

}
