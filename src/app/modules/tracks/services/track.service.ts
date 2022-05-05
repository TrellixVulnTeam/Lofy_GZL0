
import { DataServices } from './../../../data.services';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private  URL = environment.api; //en enviroment he declarado donde se encuentra la api (http://localhost:3001/api/1.0)

  constructor(private httpClient: HttpClient) {
  }

  getAllTracks$():Observable<any> {
    return this.httpClient.get("https://lofy-8d070-default-rtdb.europe-west1.firebasedatabase.app/data.json")
  }

  getAllRandom$():Observable<any> {
    return this.httpClient.get("https://lofy-8d070-default-rtdb.europe-west1.firebasedatabase.app/data.json")
  }

  getFavoritos$():Observable<any> {
    return this.httpClient.get("https://lofyfavoritos-default-rtdb.europe-west1.firebasedatabase.app/favoritos.json")
  }
  //bbdd con firebase

  getCanciones$():Observable<any>{
    return this.httpClient.get("https://lofy-8d070-default-rtdb.europe-west1.firebasedatabase.app/data.json")
  }


}
