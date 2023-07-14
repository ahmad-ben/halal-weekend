import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
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

export class PlaceCardComponent implements AfterViewInit {
  placeInfo?: placeWholeInfo;
  isWholeCardShown: boolean = false;
  hasHorizontalScroll: boolean = false;
  maxHorizontalScroll: boolean = false;
  subscriptionToCollectedObs?: Subscription;

  @ViewChild('placeCardHeader') placeCardHeaderRef!: ElementRef<HTMLElement>;
  @ViewChild('imagesSection') imagesSection!: ElementRef<HTMLElement>;

  @Output('showCard') showCard: EventEmitter<number> = new EventEmitter() ;
  @Output('showCardHeader') showCardHeader: EventEmitter<number> = new EventEmitter() ;
  @Output('hideCard') hideCard: EventEmitter<number> = new EventEmitter() ;

  constructor( public jsonData: JsonDataService){}

  ngAfterViewInit(): void {}

  getPlaceInfo(clubName: string, placeType: string, placeName: string){
    this.isWholeCardShown = false;

    let collectedObsForPlaceData = this.jsonData.placeJsonData(clubName, placeType);

    this.subscriptionToCollectedObs = collectedObsForPlaceData.subscribe({
      next: result =>{

        this.placeInfo = result[placeName];

        this.checkImagesNumber(this.placeInfo.images);

        setTimeout(() => { this.getPlaceInfoHeight() }, 50);//! <--! Change The Height By The Content From JSON SOLUTION.

      }
    });

  }

  getPlaceInfoHeight(){

    const placeCardHeaderEle = this.placeCardHeaderRef?.nativeElement;
    const placeCardHeaderHeight = placeCardHeaderEle?.offsetHeight;
    this.showCardHeader.emit(placeCardHeaderHeight);

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

  checkImagesNumber(imagesArray: any[]){
    const imagesSectionEle = this.imagesSection.nativeElement;
    imagesSectionEle.addEventListener('click', (e) => e.stopPropagation() )
    if(imagesArray.length < 3) imagesSectionEle.classList.add('fewImages')
    else imagesSectionEle.classList.remove('fewImages')
  }

  ngOnDestroy(): void {
    this.subscriptionToCollectedObs?.unsubscribe();
  }

}


//=========================================
  /*

    Find A Way For Calculate The Data Before The Hight Is Correct.

  */
//=========================================



