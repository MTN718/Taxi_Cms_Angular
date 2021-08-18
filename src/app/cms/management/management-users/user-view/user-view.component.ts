import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { PermissionDefault, Operator } from 'src/app/@models/entities/operator';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  form = new FormGroup({});
  model: Operator;
  permissions = ['Driver','Rider','Region', 'Operator', 'PaymentRequest', 'PaymentGateway', 'Car', 'Service', 'Complaint'];
  permissionValues = {};
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
              key: 'firstName',
              type: 'input',
              templateOptions: {
                label: 'First Name',
                placeholder: 'First Name',
                required: true
              }
            },
            {
              key: 'lastName',
              type: 'input',
              templateOptions: {
                label: 'Last Name',
                placeholder: 'Last Name',
                required: true
              }
            },
            {
              key: 'userName',
              type: 'input',
              templateOptions: {
                label: 'User Name',
                placeholder: 'User Name',
                required: true
              }
            },
            {
              key: 'phoneNumber',
              type: 'input',
              templateOptions: {
                label: 'Phone Number',
                placeholder: 'Phone Number'
              }
            },
            {
              key: 'mobileNumber',
              type: 'input',
              templateOptions: {
                label: 'Mobile Number',
                placeholder: 'Mobile Number'
              }
            },
            {
              key: 'address',
              type: 'input',
              templateOptions: {
                label: 'Address',
                placeholder: 'Address'
              }
            }
          ]
        }

      ]
    }
  ];
  constructor(private route: ActivatedRoute, private router: Router, private backend: BackendService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.model = x.item;
      for(let per of this.permissions) {
        let perItem = x.item[`permission${per}`];
        this.permissionValues[per] = [
          { label: 'View', value: 'view', checked: perItem.includes(PermissionDefault.View) },
          { label: 'Update', value: 'update', checked: perItem.includes(PermissionDefault.Update) },
          { label: 'Delete', value: 'delete', checked: perItem.includes(PermissionDefault.Delete) }
        ]
      }
    });
  }

  async onSubmit() {
    for(let per in this.permissionValues) {
      this.model[`permission${per}`] = (this.permissionValues[per] as any[]).filter(x => x.checked).map(x => x.value);
    }
    if(this.model.userName == 'admin' && !this.model['permissionOperator'].includes(PermissionDefault.Update)) {
      this.message.error('Limiting admin user\'s operator Update capacities is not possible.');
      return;
    }
    await this.backend.saveRow('Operator', this.model, true,this.fields, this.permissions.map(x=> `permission${x}`));
    if(this.model.id == null) {
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
  }
}
