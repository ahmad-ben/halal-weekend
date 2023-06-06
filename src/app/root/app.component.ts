import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'halalWeekendProject';

  constructor(public translate: TranslateService) {
    const chosenLanguage = localStorage.getItem('currentLanguage');
    if (chosenLanguage == "ar") {
      translate.use(chosenLanguage);
      document.documentElement.setAttribute('lang', 'ar');
    } else document.documentElement.setAttribute('lang', 'en');
  }

}
