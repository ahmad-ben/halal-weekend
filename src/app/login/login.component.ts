import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  constructor(private fireDatabase: AngularFireDatabase) {
    this.userInfo.country = '';
    this.userInfo.interests = '';
  }

  save(formInfo: any){
    console.log(formInfo);
    
  }

  skip(){

  }
}
