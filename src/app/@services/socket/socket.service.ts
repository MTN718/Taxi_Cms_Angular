import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket {
  constructor(private router: Router, private message: NzMessageService) {
    super({ url: `${environment.root}cms`, options: { query: {token: localStorage.getItem('token')} } });
    this.on('error', (error) => {
      console.log(error);
      if(error.type == 'UnauthorizedError') {
        localStorage.removeItem('token');
        this.router.navigate(['./login']);
        location.reload();
      }
    })
  }
}
