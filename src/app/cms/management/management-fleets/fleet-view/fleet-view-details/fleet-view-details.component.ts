import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fleet } from 'src/app/@models/entities/fleet';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-fleet-view-details',
  templateUrl: './fleet-view-details.component.html',
  styleUrls: ['./fleet-view-details.component.css']
})
export class FleetViewDetailsComponent implements OnInit {
  form = new FormGroup({});
  model: Fleet = {};
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
              key: 'name',
              type: 'input',
              templateOptions: {
                label: 'Name',
                placeholder: 'Name',
                required: true,
              }
            },
            {
              key: 'commissionSharePercent',
              type: 'input',
              templateOptions: {
                label: 'Commission Share Percent',
                placeholder: 'Commission Share Percent',
                type: 'number',
                min: 0,
                max: 100,
                required: true,
              }
            },
            {
              key: 'mobileNumber',
              type: 'input',
              templateOptions: {
                label: 'Mobile Number',
                placeholder: 'Mobile Number',
                type: 'number',
                required: true,
              }
            },
            {
              key: 'phoneNumber',
              type: 'input',
              templateOptions: {
                label: 'Phone Number',
                placeholder: 'Phone Number',
                type: 'number',
                required: true,
              }
            },
            {
              key: 'accountNumber',
              type: 'input',
              templateOptions: {
                label: 'Bank Account',
                placeholder: 'Bank Account',
                required: true
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
  constructor(private route: ActivatedRoute, private router: Router, private backend: BackendService, private messageService: NzMessageService) { }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.model = x.item;
    });
  }

  async onSubmit() {
    await this.backend.saveRow('Fleet', this.model, true, this.fields);
    if(this.model.id == null) {
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
  }
}
