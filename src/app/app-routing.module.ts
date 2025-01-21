import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelsComponent } from './hotels/hotels.component';
import { LoginComponent } from './login/login.component';
import { MosqueComponent } from './mosque/mosque.component';
import { MosquesComponent } from './mosques/mosques.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';

const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: '/login'},

  {path: 'login', component: LoginComponent},

  { path: 'home', loadComponent: () => import('./home/home.component').then(module => module.HomeComponent)},

  {path: 'hotels/:name', component: HotelComponent},
  {path: 'hotels', component: HotelsComponent},

  {path: 'restaurants/:name', component: RestaurantComponent},
  {path: 'restaurants', component: RestaurantsComponent},

  {path: 'mosques/:name', component: MosqueComponent},
  {path: 'mosques', component: MosquesComponent},

  { path: 'home/:placeType/:placeName', loadComponent: () => import('./home/home.component').then(module => module.HomeComponent)},

  { path: 'more', loadComponent: () => import('./more/more.component').then(module => module.MoreComponent)},
  {path: 'more/about', component: AboutUsComponent},
  { path: 'more/languages', loadComponent: () => import('./languages/languages.component').then(module => module.LanguagesComponent)},
  { path: 'more/contact', loadComponent: () => import('./contact/contact.component').then(module => module.ContactComponent)},


  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
