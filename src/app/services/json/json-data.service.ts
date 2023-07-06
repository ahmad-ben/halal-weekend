import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class JsonDataService {

  constructor(private http: HttpClient) { }

  getJsonData(clubName: string = 'Manchester United'): Observable<any> {
    return this.http.get<any>(`/assets/Json/${clubName}/generalInfo.json`);
  }

  placeJsonData(clubName: string, placeType: string): Observable<any> {
    return this.http.get<any>(`/assets/Json/${clubName}/Places Data/${placeType}.json`);
  }

}
