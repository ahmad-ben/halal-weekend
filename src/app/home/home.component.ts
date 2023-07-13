import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { ClubGeneralDataArray, ClubGeneralDataArrays } from '../common/types/clubGeneralDataArrays';
import { stadiumNames } from '../common/variables.ts/clubsNames';
import { PlaceCardComponent } from '../place-card/place-card.component';
import { JsonDataService } from '../services/json/json-data.service';
import { ShareClubNameService } from '../services/shareData/share-data.service';
import { TopNavComponent } from "../top-nav/top-nav.component";
import { ClubGeneralData } from './../common/types/clubGeneralData';
import { PlaceBasicInfo } from './../common/types/placeBasicInfo';


interface MarkerInfo {
  position: google.maps.LatLngLiteral | google.maps.LatLng,
  clubName: string,
  placeType: string,
  placeName: string,
}

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    TopNavComponent,
    BottomNavComponent,
    PlaceCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements AfterViewInit{
  @ViewChild('placeCard', { read: ElementRef }) placeCardRef!: ElementRef<HTMLElement>;
  @ViewChild('placeCard') placeCardCom!: PlaceCardComponent;
  placeCardElement!: HTMLElement;
  placeCardEleHeight!: number;

  placeType: string | undefined;
  placeName: string | undefined;

  googleMap!: google.maps.Map;

  @ViewChild('map') map!: ElementRef<HTMLDivElement>;
  mapElement!: HTMLElement;

  clubGeneralData!: ClubGeneralData;
  // <--! response$?: Observable<any>; -->
  MarkerClickedInfo: MarkerInfo | null = null;

  centerPosition: google.maps.LatLngLiteral | google.maps.LatLng = {lat: 0 , lng: 0};
  centerName!: string;

  markerInfos: MarkerInfo[] = [];

  options: google.maps.MapOptions = { zoom: 16 };

  constructor(
      public jsonData: JsonDataService,
      private activateRoute: ActivatedRoute,
      private currentClubNameSer: ShareClubNameService
    ){
      this.placeType = this.activateRoute.snapshot.paramMap.get('placeType') as string;
      this.placeName = this.activateRoute.snapshot.paramMap.get('placeName') as string;

      console.log('placeType: ', this.placeType);
      console.log('placeName: ', this.placeName);

    this.currentClubNameSer.selectedClub.subscribe({
      next: (nextPara) => {
        console.log(nextPara);
        this.clubNameSelected(nextPara);

      }
    })
  }

  ngAfterViewInit(): void {
    this.placeCardElement = this.placeCardRef?.nativeElement;
    this.mapElement = this.map?.nativeElement;
  }

  handleMapInitialized(googleMap: google.maps.Map){
    this.googleMap = googleMap;
  }

  getData(clubName: string){

    this.jsonData.getClubGeneralData(clubName).subscribe({
      next: (response) => {
        this.clubGeneralData = response;
        this.mapHandling();
      }
    });

  }

  mapHandling(){

    const stadiumInfo = this.clubGeneralData.stadium;

    this.handlePlace(stadiumInfo, 'stadium');

    const placesTypes : ClubGeneralDataArrays = ['hotels', 'restaurants', 'mosques'];

    placesTypes.forEach((placeType: ClubGeneralDataArray) => {
      const placeTypeArray = this.clubGeneralData[placeType];

      placeTypeArray.forEach((placeTypeInfo: PlaceBasicInfo) => {

        this.handlePlace(placeTypeInfo, placeType);

      } )
    })

    this.centerPosition = this.clubGeneralData.stadium.location;
  }

  handlePlace(placeBasicInfo: PlaceBasicInfo, placeType: string){

    const clubName = this.clubGeneralData.name;
    const placeLocation = placeBasicInfo.location;
    const placeName = placeBasicInfo.name;

    const customMarker = new google.maps.Marker({
      position: placeLocation,
      map: this.googleMap,
      icon: {
        url: `/assets/icons/${placeType}CustomMarkerIcon.svg`,
        scaledSize: new google.maps.Size(40, 40)
      }
    });

    const placeMarkerInfo: MarkerInfo = {
      placeType,
      placeName: placeName,
      position: placeLocation,
      clubName: clubName,
    }

    customMarker.addListener('click', () => this.markerClicked(placeMarkerInfo));

  }

  clubNameSelected(clubName: string){
    this.hideCard();
    this.getData(clubName);
  }

  markerClicked(markerInfo: MarkerInfo){
    if(stadiumNames.includes(markerInfo.placeName)) return
    if(this.MarkerClickedInfo === markerInfo) {this.hideCard(); this.MarkerClickedInfo = null;}
    else {
      this.MarkerClickedInfo = markerInfo;
      const clubName: string = markerInfo.clubName;
      const placeType: string = markerInfo.placeType;
      const placeName: string = markerInfo.placeName;
      console.log('from home: ', placeName);

      this.placeCardCom.getPlaceInfo(clubName, placeType, placeName);
    }
  }

  showCard(){
    this.placeCardElement.style.setProperty('--bottom-value', '0');
    this.placeCardElement.style.setProperty('--MaxHeight-value', '90%');

    this.mapElement.style.setProperty('--position-value', `static`);
  }

  showCardHeader(headerLength: number){

    this.mapElement.style.setProperty('--position-value', `relative`);
    this.placeCardElement.style.setProperty('--MaxHeight-value', 'none');

    setTimeout(() => {

      this.placeCardEleHeight  = this.placeCardElement.offsetHeight;

      console.log(this.placeCardEleHeight);
      console.log(headerLength);


      const length: number= -this.placeCardEleHeight + headerLength ;
      this.placeCardElement.style.setProperty('--bottom-value', `calc(${length}px + 50px)`);

    }, 50);

  }

  hideCard(){
    this.placeCardElement?.style.setProperty('--bottom-value', `-10000px`);
    this.MarkerClickedInfo = null;
  }

}


// <--! Different Between VariableName! And VariableName? -->
