import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { ClubGeneralDataArraysName } from '../common/types/clubGeneralDataArrays';
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

export class HomeComponent implements AfterViewInit, OnDestroy{
  @ViewChild('placeCard', { read: ElementRef }) placeCardRef!: ElementRef<HTMLElement>;
  @ViewChild('placeCard') placeCardCom!: PlaceCardComponent;
  @ViewChild('map') map!: ElementRef<HTMLDivElement>;

  placeCardElement!: HTMLElement;
  placeCardEleHeight!: number;

  placeCardHeaderEle!: HTMLElement;
  placeCardHeaderHeight!: number;

  placeType: ClubGeneralDataArraysName | undefined;
  placeName: string | undefined;

  googleMap!: google.maps.Map;

  mapElement!: HTMLElement;

  clubGeneralData!: ClubGeneralData;
  markersArray: google.maps.Marker[] = [];
  MarkerClickedInfo: MarkerInfo | null = null;

  centerPosition: google.maps.LatLngLiteral | google.maps.LatLng = {lat: 0 , lng: 0};

  subscriptionToCollectedObs!: Subscription;
  subscriptionToRecentClubName!: Subscription;

  options: google.maps.MapOptions = { zoom: 16 };

  constructor(
      public jsonData: JsonDataService,
      private activateRoute: ActivatedRoute,
      private currentClubNameSer: ShareClubNameService
    ){
    this.placeType = this.activateRoute.snapshot.paramMap.get('placeType') as ClubGeneralDataArraysName | undefined;
    this.placeName = this.activateRoute.snapshot.paramMap.get('placeName') as string;

    this.subscriptionToRecentClubName = this.currentClubNameSer.selectedClub.subscribe({
      next: (selectedClubName) => { this.clubNameSelected(selectedClubName) }
    })
  }

  ngAfterViewInit(): void {
    this.placeCardElement = this.placeCardRef?.nativeElement;
    this.placeCardHeaderEle = this.placeCardCom.placeCardHeaderRef.nativeElement;
    this.mapElement = this.map?.nativeElement;
  }

  handleMapInitialized(googleMap: google.maps.Map){ this.googleMap = googleMap }

  clubNameSelected(clubName: string){
    this.hideCard();
    this.getData(clubName);
  }

  hideCard(){
    this.placeCardElement?.style.setProperty('--bottom-value', `-10000px`);
    this.MarkerClickedInfo = null;
  }

  getData(clubName: string){

    let collectedObsForClubGeneralData = this.jsonData.getClubGeneralData(clubName);

    this.subscriptionToCollectedObs = collectedObsForClubGeneralData.subscribe({
      next: (generalData) => {
        this.clubGeneralData = generalData;
        this.deleteCurrentMarkers();
        this.mapHandling();
      }
    });

  }

  mapHandling(){

    const stadiumInfo = this.clubGeneralData.stadium;

    this.handlePlace(stadiumInfo, 'stadium');

    const placesTypes : ClubGeneralDataArraysName[] = ['hotels', 'restaurants', 'mosques'];

    placesTypes.forEach((placeType: ClubGeneralDataArraysName) => {
      const placeTypeArray = this.clubGeneralData[placeType];

      placeTypeArray.forEach((placeTypeInfo: PlaceBasicInfo) => {

        this.handlePlace(placeTypeInfo, placeType);

      } )
    })

    this.handleMapCenterPosition();

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
        scaledSize: new google.maps.Size(30, 40)
      }
    });

    this.markersArray.push(customMarker);

    const placeMarkerInfo: MarkerInfo = {
      placeType,
      placeName: placeName,
      position: placeLocation,
      clubName: clubName,
    }

    customMarker.addListener('click', () => this.markerClicked(placeMarkerInfo));

  }

  handleMapCenterPosition(){
    if (this.placeType && this.placeName){

      this.clubGeneralData[this.placeType].forEach((place) => {
        if (place.name == this.placeName) this.centerPosition = place.location;
      })

      this.placeType = this.placeName = undefined;

    }else this.centerPosition = this.clubGeneralData.stadium.location;
  }

  markerClicked(markerInfo: MarkerInfo){
    if(this.MarkerClickedInfo === markerInfo) {this.hideCard()}
    else {
      this.MarkerClickedInfo = markerInfo;
      const clubName: string = markerInfo.clubName;
      const placeType: string = markerInfo.placeType;
      const placeName: string = markerInfo.placeName;
      this.placeCardCom.getPlaceInfo(clubName, placeType, placeName);
    }
  }

  showCard(){
    this.placeCardElement.style.setProperty('--bottom-value', '0');
    this.placeCardElement.style.setProperty('--MaxHeight-value', '90%');

    this.mapElement.style.setProperty('--position-value', `static`);
  }

  showCardHeader(){

    this.mapElement.style.setProperty('--position-value', `relative`);

    this.placeCardElement.style.setProperty('--MaxHeight-value', 'none');

      this.placeCardEleHeight  = this.placeCardElement.offsetHeight;

      this.placeCardHeaderHeight = this.placeCardHeaderEle.offsetHeight;

      const length: number= -this.placeCardEleHeight + this.placeCardHeaderHeight ;

      this.placeCardElement.style.setProperty('--bottom-value', `calc(${length}px + 50px)`);

  }

  deleteCurrentMarkers() {this.markersArray.forEach(marker => marker.setMap(null))}

  ngOnDestroy(): void {
    this.subscriptionToCollectedObs.unsubscribe();
    this.subscriptionToRecentClubName.unsubscribe();
  }

}
