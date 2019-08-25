import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { StateService } from './state.service';

const API_URL = 'https://localhost:443/api';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private data: BehaviorSubject<any> = new BehaviorSubject(null);
    constructor( private http: HttpClient,
                 private stateService: StateService) {}

    // boradcast the data all over the app that uses this service
    broadCastData(data: any) {
        this.data.next(data);
    }
    // fetch all points with in 10 km radius
    fetchNearbyPoints(lat: string, lng: string): any {
        this.stateService.loading.next(true);
        let params = new HttpParams();
        params = params.append('lat', lat);
        params = params.append('lng', lng);
        return this.http.get(
            API_URL ,
            {
                params
            }
        );
    }
    fetchOne(lat: string, lng: string): any {
        this.stateService.loading.next(true);
        let params = new HttpParams();
        params = params.append('lat', lat);
        params = params.append('lng', lng);
        return this.http.get(
            API_URL + '/one' ,
            {
                params
            }
        );
    }

    addNewPoints(lat: string, lng: string, roadtype: string) {
        this.stateService.loading.next(true);
        const data = {
            lat,
            lng,
            roadtype
        };
        return this.http.post(
            API_URL,
            data
        );
    }
    upVote(lat: string, lng: string): any {
        this.stateService.loading.next(true);
        const data = {
            lat,
            lng
        };
        return this.http.post(
            API_URL + '/upvote',
            data
        );
    }
    downVote(lat: string, lng: string): any {
        this.stateService.loading.next(true);
        const data = {
            lat,
            lng
        };
        return this.http.post(
            API_URL + '/downvote',
            data
        );
    }

}
