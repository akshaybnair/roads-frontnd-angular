import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    markerSelected: BehaviorSubject<any> = new BehaviorSubject(null);
    selectedPosition: BehaviorSubject<any> = new BehaviorSubject(null);
    allNearByPoints: BehaviorSubject<any> = new BehaviorSubject(null);
    pointsChanged: Subject<any> = new Subject();
    loading: Subject<boolean> = new Subject();
    vehicleDetails: BehaviorSubject<any> = new BehaviorSubject(null);
    consoleMode: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
