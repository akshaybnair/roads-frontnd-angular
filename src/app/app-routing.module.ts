import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialComponent } from './social/social.component';
import { ConsoleComponent } from './console/console.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'social' },
  { path: 'social' , component: SocialComponent , data: {animation: 'SocialComponent'}},
  { path: 'console', component: ConsoleComponent, data: {animation: 'ConsoleComponent'}},
  { path: 'page-not-found', component: PageNotFoundComponent, data: {animation: 'SocialComponent'}},
  { path: '**', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
