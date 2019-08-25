import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    currentLocation: BehaviorSubject<any> = new BehaviorSubject(null);

    getCurrentLocation(successHandler: any, errorHandler: any): void {
        navigator.geolocation.getCurrentPosition((data) => {
            this.currentLocation.next(data);
            successHandler(data);
        }, errorHandler);
    }

}
