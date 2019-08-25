import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleConfigurationFormComponent } from './vehicle-configuration-form.component';

describe('VehicleConfigurationFormComponent', () => {
  let component: VehicleConfigurationFormComponent;
  let fixture: ComponentFixture<VehicleConfigurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleConfigurationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
