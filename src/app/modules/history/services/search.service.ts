import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) { }

  searchTracks$(term: string): Observable<any> {
    return this.http.get(`${this.URL}/tracks?src=${term}`)
      .pipe(
        map((dataRaw: any) => dataRaw.data) //dataraw va a ser igual a lo que consigamos de dentro de la data de la peticion
      )
  }
}
