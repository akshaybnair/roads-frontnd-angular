import { Component, OnInit, ViewChild, OnDestroy, Input, ElementRef } from '@angular/core';
import { } from 'googlemaps';
import { LocationService } from 'src/app/services/location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import {getDistanceFromLatLonInM} from '../../helpers.function';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('map', { static: false }) mapElement: any;
  @Input() consoleMode: boolean;
  private map: google.maps.Map;

  currentLocation = null;
  currentVehicleConfig = null;
  nearByPoints = [];
  // all subscriptions
  pointsChangedSubscription: Subscription;
  vehicleDetailsSubscription: Subscription;

  constructor(
    private locationservice: LocationService,
    private router: Router,
    private route: ActivatedRoute,
    private stateService: StateService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    if (this.consoleMode) {
      this.stateService.selectedPosition.subscribe(
        position => {
          this.currentLocation = position;
        }
      );
      this.vehicleDetailsSubscription = this.stateService.vehicleDetails.subscribe(
        vehicleConfig => {
          // console.log(vehicleConfig);
          this.currentVehicleConfig = vehicleConfig;
        }
      );
    }
    this.locationservice.getCurrentLocation(
      (position: any) => {
        this.currentLocation = position;
        this.loadNearBy(position);
      },
      () => {
        this.router.navigate(['page-not-found'], { relativeTo: this.route });
      }
    );
    this.pointsChangedSubscription = this.stateService.pointsChanged.subscribe(
      () => {
        if (this.currentLocation) {
          this.loadNearBy(this.currentLocation);
        }
      }
    );
  }

  placeMarker(location, option) {
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      visible: true
    });
    if (!this.consoleMode) {
      if (option) {
        this.stateService.selectedPosition.next(location);
      }
    } else {
      console.log("==========consolemode============");
      console.log(this.consoleMode);
      console.log('===========position===============');
      console.log(location);
      this.stateService.selectedPosition.next(location);
      console.log('===========vehicle config===============');
      console.log(this.currentVehicleConfig);

      this.stateService.vehicleDetails.next( {...this.currentVehicleConfig, lat: this.currentLocation.lat, lng: this.currentLocation.lng});
      if ( this.currentVehicleConfig ) {
        const velocity = 2 * Math.PI * this.currentVehicleConfig.tyreRadius * this.currentVehicleConfig.rpm / (1000 * 60);
        console.log('velocity = ' + velocity);

        const index = this.getNearByPothole(velocity);
        // console.log('nearby point is :');
        // console.log(this.nearByPoints[index]);
        if (index >= 0) {
          const distance = getDistanceFromLatLonInM(
            this.currentVehicleConfig.lat,
            this.currentLocation.lng,
            this.nearByPoints[index].location.coordinates[1],
            this.nearByPoints[index].location.coordinates[0]);
          let head = '';
          if (this.nearByPoints[index].roadtype === 'pothole') {
              head = 'Pothole ahead in ' + distance.toFixed(0).toString() + ' meters , ';
          } else if (this.nearByPoints[index].roadtype === 'hump') {
              head = 'Hump ahead in ' + +distance + ' meters ';
          }
          const body = 'Reduce your speed to 30 km per hour';
          const msg = new SpeechSynthesisUtterance(head + body);
          window.speechSynthesis.speak(msg);
        }
      } else {
        console.log( 'no vehicle config');
      }
    }
  }
  loadNearBy(position) {
    const options = {
      zoom: 18,
      center: new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      )
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, options);
    this.placeMarker(
      { lat: position.coords.latitude, lng: position.coords.longitude },
      false
    );
    google.maps.event.addListener(this.map, 'click', event => {
      this.placeMarker({lat: event.latLng.lat(), lng: event.latLng.lng() }, true);
    });
    this.dataService
      .fetchNearbyPoints(
        position.coords.latitude,
        position.coords.longitude
      )
      .subscribe(
        points => {
          if (points.length > 0) {
            alert('successfully fetched all nearby points');
            this.nearByPoints = points;
            this.addAllMarkers(points);
          }
        },
        error => {
          alert('Error fetching data');
        }
      );
    this.stateService.loading.next(false);
  }
  addAllMarkers(points: any[]) {
    let image;
    for (const point of points) {
      if (point.roadtype === 'hump') {
        image = {
          size: new google.maps.Size(32, 32),
          scaledSize: new google.maps.Size(32, 32),
          url:
            'https://static.thenounproject.com/png/131462-200.png'
        };
      } else if (point.roadtype === 'pothole') {
        image = {
          size: new google.maps.Size(32, 32),
          scaledSize: new google.maps.Size(32, 32),
          url: 'https://static.thenounproject.com/png/753-200.png'
        };
      } else {
        image = {
          size: new google.maps.Size(50, 50),
          scaledSize: new google.maps.Size(50, 50),
          url:
            'https://images.vexels.com/media/users/3/132525/isolated/preview/fb67b7c950ae96bfa81505c6640ab9cc-triple-speed-breaker-icon-by-vexels.png'
        };
      }

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          point.location.coordinates[1],
          point.location.coordinates[0]
        ),
        map: this.map,
        visible: true,
        icon: image
      });
      marker.addListener('click', evt => {

        // resolving point with on in database
        const lat = evt.latLng.lat().toString();
        const lng = evt.latLng.lng().toString();
        this.dataService.fetchOne(lat, lng).subscribe(
          (resolvedPoint) => {
            this.stateService.markerSelected.next(resolvedPoint);
          },
          (error) => {
            alert('unexpected error');
          }
        );
        this.stateService.loading.next(false);
      });
    }
  }
  ngOnDestroy() {
    if (this.vehicleDetailsSubscription ) {
      this.vehicleDetailsSubscription.unsubscribe();
    }
    if ( this.pointsChangedSubscription) {
      this.pointsChangedSubscription.unsubscribe();
    }
  }
  getNearByPothole(velocity: number) {
    const lat = this.currentVehicleConfig.lat;
    const lng = this.currentVehicleConfig.lng;
    // console.log(lat + ',' + lng);
    let minDistanceIndex = -1;
    let distance = velocity * 15; // distance that can be coveres in 15 seconds
    // console.log('threshold distance = ' + distance);
    for (let i = 0; i < this.nearByPoints.length; i++) {
      const lat1 = parseFloat(this.nearByPoints[i].location.coordinates[1]);
      const lng1 = parseFloat(this.nearByPoints[i].location.coordinates[0]);
      // console.log('coords during each iter :');
      // console.log(lat1 + ':' + lng1);
      const calculatedDistance = getDistanceFromLatLonInM(lat, lng, lat1, lng1);
      // console.log('distance' + calculatedDistance);
      if (calculatedDistance < distance) {
        minDistanceIndex = i;
        distance = calculatedDistance;
        // console.log('found one');
      }
    }
    return minDistanceIndex;
  }
}
