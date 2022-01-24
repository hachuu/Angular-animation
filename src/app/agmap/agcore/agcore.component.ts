import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';

export class Marker {
  latitude!: number;
  longitude!: number;
  type!: string;
  showInfoWindow: boolean;

  constructor() {
    this.showInfoWindow = false;
  }
}

@Component({
  selector: 'app-agcore',
  templateUrl: './agcore.component.html',
  styleUrls: ['./agcore.component.scss']
})
export class AgcoreComponent implements OnInit {

  address = '';

  map: any;

  mapLat:number = 37.532600;
  mapLng:number = 127.024612;
  zoom:number = 17;

  markers:Array<any> = [];

  orgMarker: Marker = new Marker();
  desMarker: Marker = new Marker();

  
  constructor(
    private mapsApiLoader:MapsAPILoader,
  ) { }

  ngOnInit(): void {
    this.mapsApiLoader.load().then(() => {
      this.markers.forEach((marker) => {
        marker.setMap(this.map);
        marker.addListener('click', (event: any) => {
          console.log(event);
          event.stopPropagation();
          event.preventDefault();
        });
      })
    });
  }

  mapReady(event: any) {
    console.log(event)
    this.map = event;
    this.map.addListener('click', (event: { latLng: { lat: () => number; lng: () => number; }; }) => {
      console.log(event);
      console.log(event.latLng.lat());
      this.orgMarker.latitude = event.latLng.lat();
      this.orgMarker.longitude = event.latLng.lng();

      // this.map.setCenter(this.markers.getPosition() as google.maps.LatLng);
      this.map.setCenter(event.latLng);
      alert('이 주소가 맞나요? '+event.latLng.lat()+','+event.latLng.lng());
    });
    
  }
  

  codeAddress() {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': this.address}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results) {
          console.group();
          console.log(results[0].geometry.location.lat())
          console.log(results[0].geometry.location.lng())
          console.groupEnd();
          this.mapLat = results[0].geometry.location.lat();
          this.mapLng = results[0].geometry.location.lng();
          this.orgMarker.latitude = results[0].geometry.location.lat();
          this.orgMarker.longitude = results[0].geometry.location.lng();
          alert('이 주소가 맞나요? '+results[0].formatted_address);
          // this.center = {
          //   lat: results[0].geometry.location.lat(),
          //   lng: results[0].geometry.location.lng()
          // }
        }
        // map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            // map: new google.maps.Map(document.getElementById('map'),
            position: results && results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

}
