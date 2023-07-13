import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClubGeneralData } from 'src/app/common/types/clubGeneralData';

@Injectable({
  providedIn: 'root',
})

export class JsonDataService {

  constructor(private http: HttpClient) { }

  getClubGeneralData(clubName: string): Observable<ClubGeneralData> {
    return this.http.get<any>(`/assets/Json/${clubName}/generalInfo.json`);
  }

  placeJsonData(clubName: string, placeType: string): Observable<any> {
    return this.http.get<any>(`/assets/Json/${clubName}/Places Data/${placeType}.json`);
  }

}
