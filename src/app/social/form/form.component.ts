import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';

import * as customValidator from '../../custom.validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  newPointForm: FormGroup;
  stateServiceSubscription: Subscription;

  @ViewChild('roadtype', { static: true}) roadTypeSelect: ElementRef;
  constructor(private dataService: DataService,
              private stateService: StateService) { }

  ngOnInit() {
    this.newPointForm = new FormGroup({
      lat : new FormControl(null, [Validators.required, customValidator.validLatitude, Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
      lng : new FormControl(null, [Validators.required, customValidator.validLongitude, Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
      roadtype : new FormControl('', [Validators.required])
    });

    this.stateServiceSubscription = this.stateService.selectedPosition.subscribe(
      point => {
        if ( point ) {
          this.newPointForm.setValue({
            lat : point.lat,
            lng : point.lng,
            roadtype : ''
          });
          this.roadTypeSelect.nativeElement.focus();
        }
      }
    );
  }
  onSubmit() {
    if (this.newPointForm.valid ) {
      this.dataService.addNewPoints(this.newPointForm.value.lat, this.newPointForm.value.lng, this.newPointForm.value.roadtype).subscribe(
        (data) => {
          alert('Added new point successfully');
          this.stateService.pointsChanged.next();
        },
        (error) => {
          alert(error.error.msg ? error.error.msg : 'Some error occured');
        }
      );
      this.stateService.loading.next(false);
    } else {
      alert('Invalid Data');
    }
  }

}
