import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserInfo } from 'src/app/common/types/userInfo';

@Injectable({
  providedIn: 'root'
})
export class RealtimeSaveUserInfoService {

  constructor(private fireDatabase: AngularFireDatabase) { }

  saveUserInfo(userInfo: UserInfo){
    this.fireDatabase.object(`/users/${userInfo.fullName}`).update({
      name: userInfo.fullName,
      country: userInfo.country,
      interests: userInfo.interests,
      email: userInfo.email,
      gender: userInfo.gender,
    })
  }
}

