import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { placeWholeInfo } from '../common/types/placeWholeInfo';
import { JsonDataService } from '../services/json/json-data.service';

@Component({
  selector: 'place-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss']
})

export class PlaceCardComponent {
  placeInfo?: placeWholeInfo;
  isWholeCardShown: boolean = false;
  subscriptionToCollectedObs?: Subscription;

  @ViewChild('placeCardHeader') placeCardHeaderRef!: ElementRef<HTMLElement>;
  @ViewChild('imagesSection') imagesSection!: ElementRef<HTMLElement>;

  @Output('showCard') showCard: EventEmitter<number> = new EventEmitter() ;
  @Output('showCardHeader') showCardHeader: EventEmitter<number> = new EventEmitter() ;
  @Output('hideCard') hideCard: EventEmitter<number> = new EventEmitter() ;

  constructor( public jsonData: JsonDataService){}

  getPlaceInfo(clubName: string, placeType: string, placeName: string){
    this.isWholeCardShown = false;

    let collectedObsForPlaceData = this.jsonData.placeJsonData(clubName, placeType);

    this.subscriptionToCollectedObs = collectedObsForPlaceData.subscribe({
      next: result =>{

        this.placeInfo = result[placeName];

        this.checkImagesNumber(this.placeInfo.images);

        this.showCardHeader.emit();

      }
    });

  }

  toggleCardVisibility(){

    this.isWholeCardShown = !this.isWholeCardShown;
    if(this.isWholeCardShown) this.showCard.emit();
    else this.showCardHeader.emit();

  }

  hideComponent(event: Event){
    event.stopPropagation();
    this.hideCard.emit();
  }

  checkImagesNumber(imagesArray: string[]){
    const imagesSectionEle = this.imagesSection.nativeElement;
    imagesSectionEle.addEventListener('click', (e) => e.stopPropagation() )
    if(imagesArray.length < 3) imagesSectionEle.classList.add('fewImages')
    else imagesSectionEle.classList.remove('fewImages')
  }

  ngOnDestroy(): void {
    this.subscriptionToCollectedObs?.unsubscribe();
  }

}
