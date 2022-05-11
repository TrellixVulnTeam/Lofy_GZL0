import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = environment.api;

  constructor(private http: HttpClient) { }

  sendCredentials(email:string,password:string): Observable<any> { //tiene que devolver un observable
    const body = {
      email,
      password
    }
    return this.http.post(`${this.URL}/auth/login`, body) //el body son los datos de mail y pass
  }
}
