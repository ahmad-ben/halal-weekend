import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RealtimeDataService } from '../services/database/realtime-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AngularFireDatabaseModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userInfo: any = {};

  constructor(
    private realtimeDataService: RealtimeDataService
  ) {
    this.userInfo.country = '';
    this.userInfo.interests = '';
  }

  save(formInfo: any){
    console.log(formInfo);
    console.log(formInfo.valid);
    this.realtimeDataService.saveUserInfo(formInfo.value);
  }

  skip(){

  }
}
