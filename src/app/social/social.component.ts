import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { StateService } from '../services/state.service';
import { Subscription } from 'rxjs';


interface Point {
  lat: number;
  lng: number;
  roadtype: string;
}
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit, OnDestroy {

  allNearByPoints: Point[] = [];

  isLoading = false;
  loadingSubscription: Subscription;
  constructor(private dataService: DataService,
              private stateService: StateService) { }

  ngOnInit() {
    this.loadingSubscription = this.stateService.loading.subscribe(
      loadingState => {
        this.isLoading = loadingState;
      }
    );
  }
  ngOnDestroy() {
    if ( this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

}
