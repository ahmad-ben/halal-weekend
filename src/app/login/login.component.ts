import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RealtimeDataService } from '../services/database/realtime-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  //! userInfo: any = {}; iF i will use it or not.
  reactiveForm!: FormGroup;
  invalidFrom!: boolean;

  constructor(
    private realtimeDataService: RealtimeDataService,
    private route: Router,
  ) {
    // this.userInfo.country = '';
    // this.userInfo.interests = '';
    this.reactiveForm = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      country: new FormControl("", Validators.required),
      interests: new FormControl("", Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  save(formInfo: FormGroup){
    if (formInfo.invalid) this.invalidFrom = true
    else  this.invalidFrom = false;
    // this.realtimeDataService.saveUserInfo(formInfo.value);
  }

  skip(){
    this.route.navigateByUrl('/home')
  }
}
