import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agmap',
  templateUrl: './agmap.component.html',
  styleUrls: ['./agmap.component.scss']
})
export class AgmapComponent implements OnInit {

  zoom = 20;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: "terrain",
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 25,
    minZoom: 8,
  };
  address = '';

  constructor() { }

  ngOnInit(): void {
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
          this.center = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }
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
