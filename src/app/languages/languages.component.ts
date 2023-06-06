import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BottomNavComponent,
    TranslateModule
  ],
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent {

  constructor(public translate: TranslateService){}

  changeLanguage(chosenLanguage: string){
    this.translate.use(chosenLanguage);
    localStorage.setItem('currentLanguage', chosenLanguage);
    if (chosenLanguage == 'ar') document.documentElement.setAttribute('lang', 'ar');
    else document.documentElement.setAttribute('lang', 'en');
  }

}
