import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  login(userName: string, password: string) {
    const credentials = { user_name: userName, password: password };
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          };
        return this.http.post<LoginResult>(environment.root + 'operator/login', credentials, httpOptions).toPromise();
  }
}

export interface LoginResult {
  token: string;
}