import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMushroom } from '../models/mushroom';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MushroomService {

  private url = "mushrooms";

  constructor(private http: HttpClient) { }

  public findAll(): Observable<IMushroom[]>{
    return this.http.get<IMushroom[]>(`${environment.apiUrl}/${this.url}`);
  }
}
