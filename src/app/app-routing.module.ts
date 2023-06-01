import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { EateriesComponent } from './eateries/eateries.component';
import { homeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { LandingComponent } from './landing/landing.component';
import { LanguagesComponent } from './languages/languages.component';
import { LoginComponent } from './login/login.component';
import { MoreComponent } from './more/more.component';
import { MosquesComponent } from './mosques/mosques.component';
import { ProfileComponent } from './profile/profile.component';
import { SightsComponent } from './sights/sights.component';

const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: '/landing'},
  {path: 'landing', component: LandingComponent},

  {path: 'login', component: LoginComponent},

  {path: 'home', component: homeComponent},
  {path: 'home/hotels', component: HotelsComponent},
  {path: 'home/sights', component: SightsComponent},
  {path: 'home/eateries', component: EateriesComponent},
  {path: 'home/mosques', component: MosquesComponent},

  {path: 'profile', component: ProfileComponent},

  {path: 'more', component: MoreComponent},
  {path: 'more/about', component: AboutUsComponent},

  {path: 'languages', component: LanguagesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
