import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-more',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BottomNavComponent,
    TranslateModule
  ],
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent {

  constructor(public translate: TranslateService) {}

}
