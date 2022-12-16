import { Component, Input, OnInit } from '@angular/core';
import { HomeOutletMapInterface, HomeUserListMap } from '../../home.interface';
import { HomeService } from '../../home.service';

@Component({
  selector: 'home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss']
})
export class HomeMapComponent implements OnInit {

  constructor(
    private homeService: HomeService
  ) { }

  @Input() loadingMap: boolean = false;
  @Input() markers: HomeOutletMapInterface[] = [];
  @Input() usersMarkers: HomeUserListMap[] = [];

  defaultCoordinates = {
    lat: 1,
    lng: 1
  }

  ngOnInit(): void {
    if(this.usersMarkers.length){
      this.defaultCoordinates.lat = this.usersMarkers[0].lat;
      this.defaultCoordinates.lng = this.usersMarkers[0].lng;
    }
  }

  toggleMarkers(element: any) {
    for (var key in this.markers) {
      let c_marker = this.markers[key];

      if (c_marker.ref == element.id) {
        c_marker.visible = !c_marker.visible;
      }
    }
    for (var key in this.usersMarkers) {
      let c_marker = this.usersMarkers[key];

      if (c_marker.ref == element.id) {
        c_marker.visible = !c_marker.visible;
      }
    }
  }

  toggleInfoWindow(marker: any) {
    marker.info_window = !marker.info_window;
  }

}
