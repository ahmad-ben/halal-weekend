import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { stadiumNames } from '../common/clubsNames';
import { JsonDataService } from '../services/json/json-data.service';
import { ShareClubNameService } from '../services/shareData/share-data.service';
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

  placeType: string | undefined;
  placeName: string | undefined;

  googleMap: google.maps.Map | undefined;

  @ViewChild('map') map!: ElementRef<HTMLDivElement>;
  mapElement!: HTMLElement;

  response: any;
  response$?: Observable<any>;
  MarkerClickedInfo: MarkerInfo | null = null;

  centerPosition: google.maps.LatLngLiteral | google.maps.LatLng = {lat: 0 , lng: 0};
  centerName!: string;

  markerInfos: MarkerInfo[] = [];

  options: google.maps.MapOptions = { zoom: 18 };

  constructor(
      public jsonData: JsonDataService,
      private activateRoute: ActivatedRoute,
      private currentClubName: ShareClubNameService
    ){
      this.placeType = this.activateRoute.snapshot.paramMap.get('placeType') as string;
      this.placeName = this.activateRoute.snapshot.paramMap.get('placeName') as string;

      console.log('placeType: ', this.placeType);
      console.log('placeName: ', this.placeName);

    this.currentClubName.selectedClub.subscribe({
      next: (nextPara) => {
        console.log(nextPara);
        this.clubNameSelected(nextPara);

      }
    })
  }

  getData(clubName: string){

    this.jsonData.getJsonData(clubName).subscribe({
      next: (response) => {
        this.response = response;
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

  mapHandling(clubsName: string){

    console.log('placeName', this.placeName);
    console.log('placeType', this.placeType);

    if(this.placeName && this.placeType){


      console.log(this.response);

      console.log(this.response[this.placeType]);

      if(this.placeType == "hotels"){

        const hotelsArray : any[] = this.response[this.placeType];

        hotelsArray.forEach(hotel => {
          if (hotel.hotel_name == this.placeName) {
            this.centerPosition = hotel.location;
            this.centerName = hotel.hotel_name;

            const customMarker = new google.maps.Marker({
              position: hotel.location,
              map: this.googleMap,
              icon: {
                url: "/assets/icons/hotelCustomMarker.svg",
                scaledSize: new google.maps.Size(40, 40)
              },
            });

            const customMarkerInfo: MarkerInfo = {
              clubName: clubsName,
              placeType: "hotels",
              placeName: this.centerName,
              position: this.centerPosition
            }

            customMarker.addListener('click', () => this.markerClicked(customMarkerInfo))

          } else{
            const hotelInfo: MarkerInfo = {
              clubName: clubsName,
              placeType: "hotels",
              placeName: hotel.hotel_name,
              position: hotel.location
            }
            this.markerInfos.push(hotelInfo)
          }



          const stadiumInfo: MarkerInfo = {
            placeType: 'stadium',
            placeName: this.response.stadium.stadium_name,
            position: this.response.stadium.location,
            clubName: clubsName,
          }
          this.markerInfos.push(stadiumInfo)
        })

        const restaurants: any[] = this.response.restaurants;

        restaurants.forEach((restaurant) => {
          const restaurantInfo: MarkerInfo = {
            clubName: clubsName,
            placeType: "restaurants",
            placeName: restaurant.restaurant_name,
            position: restaurant.location
          }
          this.markerInfos.push(restaurantInfo)
        })

        const mosques: any[] = this.response.mosques;

        mosques.forEach((mosque) => {
          const mosqueInfo: MarkerInfo = {
            clubName: clubsName,
            placeType: "mosques",
            placeName: mosque.mosque_name,
            position: mosque.location
          }
          this.markerInfos.push(mosqueInfo);
        })

      } else if(this.placeType == "restaurants"){

        const restaurantsArray : any[] = this.response[this.placeType];

        restaurantsArray.forEach(restaurant => {
          if (restaurant.restaurant_name == this.placeName) {
            this.centerPosition = restaurant.location;
            this.centerName = restaurant.hotel_name;

            const customMarker = new google.maps.Marker({
              position: restaurant.location,
              map: this.googleMap,
              icon: {
                url: "/assets/icons/restaurantsCustomMarker.svg",
                scaledSize: new google.maps.Size(40, 40)
              }
            });

            const customMarkerInfo: MarkerInfo = {
              clubName: clubsName,
              placeType: "restaurants",
              placeName: this.centerName,
              position: this.centerPosition
            }

            customMarker.addListener('click', () => this.markerClicked(customMarkerInfo))

          } else{
            const restaurantInfo: MarkerInfo = {
              clubName: clubsName,
              placeType: "restaurants",
              placeName: restaurant.restaurant_name,
              position: restaurant.location
            }
            this.markerInfos.push(restaurantInfo)
          }

          const stadiumInfo: MarkerInfo = {
            placeType: 'stadium',
            placeName: this.response.stadium.stadium_name,
            position: this.response.stadium.location,
            clubName: clubsName,
          }
          this.markerInfos.push(stadiumInfo)
        })

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

        const mosques: any[] = this.response.mosques;

        mosques.forEach((mosque) => {
          const mosqueInfo: MarkerInfo = {
            clubName: clubsName,
            placeType: "mosques",
            placeName: mosque.mosque_name,
            position: mosque.location
          }
          this.markerInfos.push(mosqueInfo);
        })

      } else if (this.placeType == "mosques"){

        const mosquesArray : any[] = this.response[this.placeType];

        mosquesArray.forEach(mosque => {
          if (mosque.mosque_name == this.placeName) {
            this.centerPosition = mosque.location;
            this.centerName = mosque.mosque_name;

            const customMarker = new google.maps.Marker({
              position: mosque.location,
              map: this.googleMap,
              icon: {
                url: "/assets/icons/mosqueCustomMarker.svg",
                scaledSize: new google.maps.Size(40, 40)
              }
            });

            const customMarkerInfo: MarkerInfo = {
              clubName: clubsName,
              placeType: "mosques",
              placeName: this.centerName,
              position: this.centerPosition
            }

            customMarker.addListener('click', () => this.markerClicked(customMarkerInfo))

          } else{
            const mosqueInfo: MarkerInfo = {
              clubName: clubsName,
              placeType: "restaurants",
              placeName: mosque.mosque_name,
              position: mosque.location
            }
            this.markerInfos.push(mosqueInfo)
          }

          const stadiumInfo: MarkerInfo = {
            placeType: 'stadium',
            placeName: this.response.stadium.stadium_name,
            position: this.response.stadium.location,
            clubName: clubsName,
          }
          this.markerInfos.push(stadiumInfo)
        })

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

        const restaurants: any[] = this.response.restaurants;

        restaurants.forEach((restaurant) => {
          const restaurantInfo: MarkerInfo = {
            clubName: clubsName,
            placeType: "restaurants",
            placeName: restaurant.restaurant_name,
            position: restaurant.location
          }
          this.markerInfos.push(restaurantInfo)
        })

      }


    }else{


      this.centerPosition = this.response.stadium.location;
      this.centerName = this.response.stadium.stadium_name;

      const centerInfo: MarkerInfo = {
        placeType: 'stadium',
        placeName: this.centerName,
        position: this.centerPosition,
        clubName: clubsName,
      }
      this.markerInfos.push(centerInfo);



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

      const restaurants: any[] = this.response.restaurants;

      restaurants.forEach((restaurant) => {
        const restaurantInfo: MarkerInfo = {
          clubName: clubsName,
          placeType: "restaurants",
          placeName: restaurant.restaurant_name,
          position: restaurant.location
        }
        this.markerInfos.push(restaurantInfo)
      })

      const mosques: any[] = this.response.mosques;

      mosques.forEach((mosque) => {
        const mosqueInfo: MarkerInfo = {
          clubName: clubsName,
          placeType: "mosques",
          placeName: mosque.mosque_name,
          position: mosque.location
        }
        this.markerInfos.push(mosqueInfo);
      })




    }


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
    this.placeCardElement?.style.setProperty('--bottom-value', `-${this.placeCardEleHeight}px`);
    this.MarkerClickedInfo = null;
  }

  handleMapInitialized(googleMap: google.maps.Map){

    this.googleMap = googleMap;

  }

}


