import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class RealtimeDataService {

  constructor(private fireDatabase: AngularFireDatabase) { }

  saveUserInfo(userInfo: any){
    this.fireDatabase.object(`/users/${userInfo.fullName}`).update({
      name: userInfo.fullName, 
      country: userInfo.country,
      interests: userInfo.interests,
      email: userInfo.email,
      gender: userInfo.gender,
    })
  }
}

