import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class ConfigGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router, private msg: NzMessageService) { }
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
    let res = await this.http.get(`${environment.root}config/is_configed`, {}).toPromise();
    if(!res) {
      return true;
    } else {
      this.msg.warning('System is already configured. Try with admin password parameter');
      this.router.navigate(['../login']);
    }

  }

}
