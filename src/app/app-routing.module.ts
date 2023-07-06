import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { EateriesComponent } from './eateries/eateries.component';
import { EateryComponent } from './eatery/eatery.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelsComponent } from './hotels/hotels.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MosqueComponent } from './mosque/mosque.component';
import { MosquesComponent } from './mosques/mosques.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: '/landing'},
  {path: 'landing', component: LandingComponent},

  {path: 'login', component: LoginComponent},

  {path: 'home/hotel/:name', component: HotelComponent},

  { path: 'home/:placeType/:placeName', loadComponent: () => import('./home/home.component').then(module => module.HomeComponent)},
  { path: 'home', loadComponent: () => import('./home/home.component').then(module => module.HomeComponent)},

  {path: 'home/hotels', component: HotelsComponent},

  {path: 'home/eateries/:name', component: EateryComponent},
  {path: 'home/eateries', component: EateriesComponent},

  {path: 'home/mosques/:name', component: MosqueComponent},
  {path: 'home/mosques', component: MosquesComponent},

  {path: 'profile', component: ProfileComponent},

  { path: 'more', loadComponent: () => import('./more/more.component').then(module => module.MoreComponent)},
  {path: 'more/about', component: AboutUsComponent},

  { path: 'languages', loadComponent: () => import('./languages/languages.component').then(module => module.LanguagesComponent)},

  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
