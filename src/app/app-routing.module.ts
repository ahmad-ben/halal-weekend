import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { EateriesComponent } from './eateries/eateries.component';
import { HotelsComponent } from './hotels/hotels.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MosquesComponent } from './mosques/mosques.component';
import { ProfileComponent } from './profile/profile.component';
import { SightsComponent } from './sights/sights.component';

const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: '/landing'},
  {path: 'landing', component: LandingComponent},

  {path: 'login', component: LoginComponent},

  { path: 'home', loadComponent: () => import('./home/home.component').then(module => module.HomeComponent)},
  {path: 'home/hotels', component: HotelsComponent},
  {path: 'home/sights', component: SightsComponent},
  {path: 'home/eateries', component: EateriesComponent},
  {path: 'home/mosques', component: MosquesComponent},

  {path: 'profile', component: ProfileComponent},
  { path: 'home', loadComponent: () => import('./home/home.component').then(module => module.HomeComponent)},

  { path: 'more', loadComponent: () => import('./more/more.component').then(module => module.MoreComponent)},
  {path: 'more/about', component: AboutUsComponent},

  { path: 'languages', loadComponent: () => import('./languages/languages.component').then(module => module.LanguagesComponent)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
