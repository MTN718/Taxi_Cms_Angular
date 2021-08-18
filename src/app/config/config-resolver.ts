import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Settings from '../@models/settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigResolver implements Resolve<Settings> {
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Settings> {
    let body = {};
    if(route.queryParamMap.get('pass') != null) {
      body['pass'] = route.queryParamMap.get('pass');
    }
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json' as 'json'
    };
    let res = await this.http.post<Settings>(`${environment.root}config/get`, body, httpOptions).toPromise();
    return res;
  }

  constructor(private http: HttpClient) { }
}
