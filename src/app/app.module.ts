import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SocialComponent } from './social/social.component';
import { ConsoleComponent } from './console/console.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapComponent } from './social/map/map.component';
import { VotingComponent } from './social/voting/voting.component';
import { FormComponent } from './social/form/form.component';
import { LoadingComponent } from './loading/loading.component';
import { ConsoleMapComponent } from './console/console-map/console-map.component';
import { VehicleConfigurationFormComponent } from './vehicle-configuration-form/vehicle-configuration-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SocialComponent,
    ConsoleComponent,
    PageNotFoundComponent,
    MapComponent,
    VotingComponent,
    FormComponent,
    LoadingComponent,
    ConsoleMapComponent,
    VehicleConfigurationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
