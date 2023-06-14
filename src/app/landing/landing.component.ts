import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { arCountries } from '../common/world\'sCountries';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  constructor(public translate: TranslateService) {

    arCountries.sort((a, b) => a.localeCompare(b, "ar"));


  }

}
