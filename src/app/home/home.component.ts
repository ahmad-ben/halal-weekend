import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Observable } from 'rxjs';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { stadiumNames } from '../common/clubsNames';
import { JsonDataService } from '../services/json/json-data.service';
import { TopNavComponent } from "../top-nav/top-nav.component";
import { PlaceCardComponent } from './../place-card/place-card.component';


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

  @ViewChild('map') map!: ElementRef<HTMLDivElement>;
  mapElement!: HTMLElement;

  response: any;
  response$?: Observable<any>;
  MarkerClickedInfo: MarkerInfo | null = null;

  centerPosition: google.maps.LatLngLiteral | google.maps.LatLng = {lat: 0 , lng: 0};
  centerName!: string;

  markerInfos: MarkerInfo[] = [];

  options: google.maps.MapOptions = { zoom: 18 };

  constructor(public jsonData: JsonDataService){
    this.getData();
  }

  getData(clubName?: string){

    this.jsonData.getJsonData(clubName).subscribe({
      next: (response) => {
        this.response = response;
        console.log(response);

        this.mapHandling(clubName);
      }
    });

  }

  ngAfterViewInit(): void {
    this.placeCardElement = this.placeCardRef?.nativeElement;
    this.mapElement = this.map?.nativeElement;

    this.placeCardEleHeight = this.placeCardElement.offsetHeight;
    this.placeCardElement.style.setProperty('--bottom-value', `-${this.placeCardEleHeight}px`);

  }

  mapHandling(clubsName: string = 'Manchester United'){
    console.log(this.response);

    this.centerPosition = this.response.stadium.location;
    this.centerName = this.response.stadium.stadium_name;

    const centerInfo: MarkerInfo = {
      placeType: 'stadium', 
      placeName: this.centerName, 
      position: this.centerPosition,
      clubName: clubsName,
    }
    this.markerInfos.push(centerInfo)

    const hotels: any[] = this.response.hotels;

    hotels.forEach((hotel) => {
      const hotelInfo: MarkerInfo = { 
        clubName: clubsName,
        placeType: "hotels", 
        placeName: hotel.hotel_name, 
        position: hotel.location 
      }
      this.markerInfos.push(hotelInfo)
    })
  }

  clubNameSelected(clubName: string){
    this.hideCard()
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
      this.placeCardCom.getPlaceInfo(clubName, placeType, placeName);
    }
  }

  showCard(){
    this.placeCardElement.style.setProperty('--bottom-value', '0');
    this.placeCardElement.style.setProperty('--MaxHeight-value', '90%');

    this.mapElement.style.setProperty('--position-value', `static`);
  }

  showCardHeader(headerLength: number){
    this.placeCardElement.style.setProperty('--MaxHeight-value', 'none');
    this.placeCardEleHeight  = this.placeCardElement.offsetHeight;


    const length: number= -this.placeCardEleHeight + headerLength ;
    this.placeCardElement.style.setProperty('--bottom-value', `calc(${length}px + 1rem)`);

    this.mapElement.style.setProperty('--position-value', `relative`);
  }

  hideCard(){
    this.placeCardElement.style.setProperty('--bottom-value', `-${this.placeCardEleHeight}px`);
    this.MarkerClickedInfo = null;
  }

}


