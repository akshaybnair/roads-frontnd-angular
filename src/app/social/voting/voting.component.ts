import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';
import { Subscription } from 'rxjs';

interface Marker {
  lat: number;
  lng: number;
  upvotes: number;
  downvotes: number;
  roadtype: string;
}
@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit, OnDestroy {

  isMarkerSelected = false;
  location: Marker = {lat: 0,
                      lng: 0,
                      upvotes: -1,
                      downvotes: -1,
                      roadtype: 'other' };

  markerSlectedSubscription: Subscription;
  constructor(private dataService: DataService,
              private stateService: StateService) { }

  ngOnInit() {
    this.markerSlectedSubscription = this.stateService.markerSelected.subscribe(
      (location) => {
        if (location) {
          this.isMarkerSelected = true;
          console.log( location);
          this.location.lat = location.location.coordinates[0];
          this.location.lng = location.location.coordinates[1];
          this.location.roadtype = location.roadtype;
          this.location.upvotes = location.positiveVotes;
          this.location.downvotes = location.negetiveVotes;
        }
      }
    );
  }
  ngOnDestroy() {
    this.markerSlectedSubscription.unsubscribe();
  }

  vote(option: string) {
    let votingFunctionRef = null;
    if (option === 'up') {
      votingFunctionRef = this.dataService.upVote;
    } else if ( option === 'down') {
      votingFunctionRef = this.dataService.downVote;
    }
    votingFunctionRef( this.location.lat.toString(), this.location.lng.toString() ).subscribe(
      (response) => {
        console.log(response);
        alert(response);
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );
  }
}
