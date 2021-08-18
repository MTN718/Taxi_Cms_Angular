import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Operator } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { SocketService } from 'src/app/@services/socket/socket.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-management-settings',
  templateUrl: './management-settings.component.html',
  styleUrls: ['./management-settings.component.css']
})
export class ManagementSettingsComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      type: 'flex-layout',
      templateOptions: {
        fxLayout: 'column'
      },
      fieldGroup: [
        {
          type: 'flex-layout',
          templateOptions: {
            fxLayout: 'row',
            title: ''
          },
          fieldGroup: [
            {
              key: 'oldPass',
              type: 'input',
              templateOptions: {
                label: 'Current Password',
                placeholder: 'Current Password',
                type: 'password'
              }
            },
            {
              key: 'newPass',
              type: 'input',
              templateOptions: {
                label: 'New Password',
                placeholder: 'New Password',
                type: 'password',
                required: true
              }
            },
            {
              key: 'newPassAgain',
              type: 'input',
              templateOptions: {
                label: 'New Password Repeat',
                placeholder: 'New Password Repeat',
                type: 'password',
                required: true
              }
            }
          ]
        }

      ]
    }
  ];
  constructor(private route: ActivatedRoute, private router: Router, private socket: SocketService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
    });
  }

  async onSubmit() {
    if(this.model.newPass != this.model.newPassAgain) {
      this.message.error('Passwords don\'t match.');
      return;
    }
    this.socket.emit('updateOperatorPassword', this.model, (result: number) => {
      if(result == 200) {
        this.message.success('Password Updated Successfully.');
      } else if(result == 403) {
        this.message.error('Current Password Was not valid');
      } else if(result == 201) {
        this.message.warning('This action is not allowed in test mode.');
      }
      this.model = {};
    });
  }
}
