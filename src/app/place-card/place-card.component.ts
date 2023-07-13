import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { JsonDataService } from '../services/json/json-data.service';

@Component({
  selector: 'place-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss']
})

export class PlaceCardComponent implements AfterViewInit {
  placeInfo!: any;
  isWholeCardShown: boolean = false;
  hasHorizontalScroll: boolean = false;
  maxHorizontalScroll: boolean = false;

  @ViewChild('placeCardHeader') placeCardHeaderRef!: ElementRef<HTMLElement>;
  @ViewChild('imagesSection') imagesSection!: ElementRef<HTMLElement>;

  @Output('showCard') showCard: EventEmitter<number> = new EventEmitter() ;
  @Output('showCardHeader') showCardHeader: EventEmitter<number> = new EventEmitter() ;
  @Output('hideCard') hideCard: EventEmitter<number> = new EventEmitter() ;

  constructor(
    public jsonData: JsonDataService,
    ){}

  ngAfterViewInit(): void {}

  getPlaceInfo(clubName: string, placeType: string, placeName: string){
    this.isWholeCardShown = false;
    this.jsonData.placeJsonData(clubName, placeType).subscribe({
      next: result =>{

        this.placeInfo = result[placeName];

        this.checkImagesNumber(this.placeInfo.images);

        setTimeout(() => { this.getPlaceInfoHeight(); }, 50);//! Change The Height By The Content From JSON SOLUTION.

      }
    });
  }

  getPlaceInfoHeight(){

    const placeCardHeaderEle = this.placeCardHeaderRef?.nativeElement;
    console.log(placeCardHeaderEle);
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
    if(imagesArray.length < 3) this.imagesSection.nativeElement.classList.add('fewImages')
    else this.imagesSection.nativeElement.classList.remove('fewImages')
  }

}


//=========================================
  /*

    Find A Way For Calculate The Data Before The Hight Is Correct.

  */
//=========================================



