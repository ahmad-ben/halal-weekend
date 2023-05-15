import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';


interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  }
};


@Component({
  selector: 'map-test',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
  ],
  templateUrl: './map-test.component.html',
  styleUrls: ['./map-test.component.scss']
})


export class MapTestComponent {
  //=> Full Library Based
  //center: google.maps.LatLngLiteral = {lat: 40, lng: -20};
  options: google.maps.MapOptions = {
    center: {lat: 35.546579, lng: -5.365447},
    zoom: 12,
  };

  //: Create Standard Marker:
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  markerPositions: google.maps.LatLngLiteral[] = [
    {lat: 35.54657977, lng: -5.36544907},
  ];

  constructor(){}

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng!.toJSON());
  }


  //=> Customize Building:
  @ViewChild('myGoogleMap', { static: true }) map!: GoogleMap;

  customOptions: google.maps.MapOptions = {
    center: {lat: 35.546579, lng: -5.365447},
    zoom: 12,
  };

  markers: MarkerProperties[] = [
    { position: {lat: 35.546579, lng: -5.365447}},
  ];


  handleMapInitialized(map: google.maps.Map) {
    this.markers.forEach((marker: MarkerProperties) => {
      new google.maps.Marker({
        position: marker.position,
        map,
        icon: {
          url: "../../assets/test/stadium.jpg",
          scaledSize: new google.maps.Size(40, 40)
        }
      });
    });
  }

}
