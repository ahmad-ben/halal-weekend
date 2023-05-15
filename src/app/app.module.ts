import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideDatabase(() => getDatabase()),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



