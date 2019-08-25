import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as customValidator from '../custom.validator';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-vehicle-configuration-form',
  templateUrl: './vehicle-configuration-form.component.html',
  styleUrls: ['./vehicle-configuration-form.component.css']
})
export class VehicleConfigurationFormComponent implements OnInit {
  vehicleConfigForm: FormGroup;
  constructor( private stateService: StateService) { }

  ngOnInit() {
    const defaultSpeed = 3000;
    const defaultTyreRadius = 200; // mm
    this.vehicleConfigForm = new FormGroup({
      lat : new FormControl(null, [Validators.required, customValidator.validLatitude, Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
      lng : new FormControl(null, [Validators.required, customValidator.validLongitude, Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
      rpm : new FormControl(defaultSpeed, [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
      rpmVal : new FormControl({value: defaultSpeed, disabled: true}, [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
      tyreRadius : new FormControl(defaultTyreRadius, [Validators.required, Validators.pattern(/^[0-9]$/)])
    });
    this.stateService.selectedPosition.subscribe(
      point => {
        if (point) {
          console.log('========point recievec in form cmp==============');
          console.log(point);
          this.vehicleConfigForm.controls.lat.setValue(point.lat);
          this.vehicleConfigForm.controls.lng.setValue(point.lng);
        }
      }
    );
    this.stateService.vehicleDetails.next(this.vehicleConfigForm.value);
    this.vehicleConfigForm.valueChanges.subscribe(
      (value) => {
        this.stateService.vehicleDetails.next(value);
      }
    );
  }
  onSubmit() {

  }
  updateValueonSliderChange() {
    this.vehicleConfigForm.controls.rpmVal.setValue(this.vehicleConfigForm.value.rpm);
  }

}
