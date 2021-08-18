import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UploadChangeParam, NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Settings, { MySqlSettings, FirebaseAdminSettings } from '../@models/settings';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  currentStep = 0;
  tplModal: NzModalRef;
  config: Settings;
  dashboardAPIKey: string;
  root: string;
  clients = [];
  selectedClient: string;
  configed: boolean = false;
  tplModalButtonLoading = false;
  @ViewChild('tplContent') clientModalContent: TemplateRef<any>;
  @ViewChild('tplFooter') clientModalFooter: TemplateRef<any>;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'json' as 'json'
  };
  constructor(private msg: NzMessageService, private http: HttpClient, private route: ActivatedRoute, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.root = environment.root;
    this.route.data.subscribe(x => {
      if(x.item.mysql == null) {
        let set: MySqlSettings = {
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'taxinew',
          port: 3306
        };
        x.item.mysql = set;
      }
      if(x.item.firebase == null) {
        let fb: FirebaseAdminSettings = {
          rider : {keyFile: '', dbUrl: ''},
          driver : {keyFile: '', dbUrl: ''},
        }
        x.item.firebase = fb;
      }
      this.config = x.item;
    })
  }

  pre(): void {
    this.currentStep -= 1;
  }

  next(): void {
    switch (this.currentStep) {
      case (0):
        this.http.post(`${environment.root}config/update_purchase`, { code: this.config.purchaseCode }, this.httpOptions).toPromise().then(x => {
          this.currentStep += 1;
        }).catch(x => {
          if(x.status == 300) {
            this.clients = x.error.clients;
            this.createClientsModal();
            return;
          }
          this.msg.error(x.error.message);
        });
        break;

      case (1):
        this.http.post(`${environment.root}config/update_sql`, this.config.mysql, this.httpOptions).toPromise().then(x => {
          this.currentStep += 1;
        }).catch(x => {
          this.msg.error(x.error.message);
        });
        break;

      case (2):
        this.http.post(`${environment.root}config/update_maps`, { key: this.config.googleMapsKey, dashboard: this.dashboardAPIKey}, this.httpOptions).toPromise().then(x => {
          this.currentStep += 1;
        }).catch(x => {
          this.msg.error(x.error.message);
        });
        break;
    }
  }

  createClientsModal(): void {
    this.tplModal = this.modalService.create({
      nzTitle: 'License Verification',
      nzContent: this.clientModalContent,
      nzFooter: this.clientModalFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => {
        
      }
    });
  }
  disableServer() {
    this.tplModalButtonLoading = true;
        this.http.post(`${environment.root}config/disable_one`, {ip: this.selectedClient}, this.httpOptions).toPromise().then( x => {
          this.msg.success('Disable was successful.');
          this.tplModal.close();
        });
  }

  done(): void {
    this.http.post(`${environment.root}config/update_firebase`, this.config.firebase, this.httpOptions).toPromise().then(x => {
      this.configed = true;
    }).catch(x => {
      this.msg.error(x.error.message);
    });
  }

  handleChange(event: UploadChangeParam, type: string): void {
    const status = event.file.status;
    if (status !== 'uploading') {
      console.log(event.file, event.fileList);
    }
    if (status === 'done') {
      this.msg.success(`${event.file.name} file uploaded successfully.`);
      this.config.firebase[type].keyFile = event.file.name;
    } else if (status === 'error') {
      this.msg.error(`${event.file.name} file upload failed.`);
    }
  }

}
