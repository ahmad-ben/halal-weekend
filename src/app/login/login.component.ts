import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { arCountries, enCountries } from '../common/world\'sCountries';
import { RealtimeshareClubNameService } from '../services/database/realtime-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  reactiveForm!: FormGroup;
  invalidFrom!: boolean;
  countries?: string[];

  constructor(
    private realtimeshareClubNameService: RealtimeshareClubNameService,
    private route: Router,
    translate: TranslateService
  ) {
    this.reactiveForm = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      country: new FormControl("", Validators.required),
      interests: new FormControl("", Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
    })

    this.countries = (translate.currentLang == "ar") ? arCountries : enCountries ;

  }



  save(formInfo: FormGroup){
    if (formInfo.invalid) this.invalidFrom = true
    else  this.invalidFrom = false;
    // this.realtimeshareClubNameService.saveUserInfo(formInfo.value);
  }

  skip(){
    this.route.navigateByUrl('/home')
  }
}
