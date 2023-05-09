import { Component } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/compat/database';

import jsonFile from './json/example.json';


@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'halalWeekendProject';

  jsonContent = jsonFile;

  constructor() {

  }
}
