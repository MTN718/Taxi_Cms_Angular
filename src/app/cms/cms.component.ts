import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from '../@services/socket/socket.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Stats } from '../@models/stats';
import { mainPageSwitchTransition } from '../@animations/main.animation';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css'],
  animations: [mainPageSwitchTransition]
})
export class CMSComponent implements OnInit {
  @HostBinding('@mainPageSwitchTransition') state = 'activated';
  isCollapsed = true;
  stats: Stats = new Stats();
  isDarkMode = false;
  
  constructor(private router: Router, private route: ActivatedRoute, private socket: SocketService, private notification: NzNotificationService) {
   }

  ngOnInit(): void {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      //this.isDarkMode = true;
      this.changeTheme();
    }
    this.socket.fromEvent('newNotification').subscribe((x: SocketNotification) => {
      let title = x.type == 'Complaint' ? 'New Complaint' : (x.type == 'Driver') ? 'Driver Submitted' : 'Payment Requeset';
      let message = x.type == 'Complaint' ? 'A Complaint has been made.' : (x.type == 'Driver') ? 'A new Driver has submitted awaiting your approval.' : 'A driver has requested payment.';
      this.notification.create(
        x.type == 'Complaint' ? 'warning' : 'info',
        title,
        message
      )
    });
    this.socket.emit('getStats', null, (result: Stats) => {
      this.stats = result;
    });
    this.socket.fromEvent('statChanged').subscribe((x: any) => {
      this.stats[x.key] += x.value;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login'], {relativeTo: this.route.root});
    window.location.reload();
  }

  changeTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      let head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = 'dark-theme';
      style.href = '/theme.dark.css';
      head.appendChild(style);
    } else {
      const dom = document.getElementById('dark-theme');
      if (dom) {
        dom.remove();
      }
    }
  }
}

interface SocketNotification {
  type: 'Complaint' | 'PaymentRequest' | 'Driver';
  id: number;
}