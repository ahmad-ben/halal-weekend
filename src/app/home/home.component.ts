import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { JsonDataService } from '../services/json/json-data.service';
import { TopNavComponent } from '../top-nav/top-nav.component';


interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  }
};


@Component({
  selector: 'home',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    TopNavComponent,
    BottomNavComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class homeComponent {
  response: any;

  center!: google.maps.LatLngLiteral | google.maps.LatLng;

  markerPositions: google.maps.LatLngLiteral[] = [];

  //=> Full Library Based
  options: google.maps.MapOptions = {
    zoom: 18,
  };

  constructor(public jsonData: JsonDataService){

    jsonData.getJsonData().subscribe({

      next: (response) => {
        this.response = response;

        this.mapHandling();

      }

    });

  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng!.toJSON());
  }

  clubNameSelected(event: any){
    console.log(event);

    if(event == 'Chelsea') this.mapHandling(2)
    else if (event == 'Manchester United') this.mapHandling(0)
    else this.mapHandling(1)

  }

  mapHandling(clubName: number = 0){

    this.center = this.response.teams[clubName].stadium.location;

    this.markerPositions.push(this.response.teams[clubName].stadium.location as google.maps.LatLngLiteral)

    const hotels: any[] = this.response.teams[clubName].hotels;

    hotels.forEach(hotel => this.markerPositions.push(hotel.location as google.maps.LatLngLiteral) )

  }

}



