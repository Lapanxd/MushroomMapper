import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGeoPoint } from '../models/geo-point';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeoPointService {

  private url = "geopoints";

  constructor(private http: HttpClient) { }

  public findAll(): Observable<IGeoPoint[]>{
    return this.http.get<IGeoPoint[]>(`${environment.apiUrl}/${this.url}`);
  }

  public create(mushroom: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.url}`, mushroom);
  }
}
