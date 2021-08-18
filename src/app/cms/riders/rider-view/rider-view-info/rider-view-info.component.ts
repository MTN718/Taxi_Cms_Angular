import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Service } from 'src/app/@models/entities/service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-rider-view-info',
  templateUrl: './rider-view-info.component.html',
  styleUrls: ['./rider-view-info.component.css']
})
export class RiderViewInfoComponent implements OnInit {
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
            title: 'Public Information'
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
                required: true,
              }
            },
            {
              key: 'gender',
              type: 'select',
              templateOptions: {
                label: 'Gender',
                placeholder: 'Gender',
                options: [
                  { label: 'Female', value: 'female' },
                  { label: 'Male', value: 'male' },
                ]
              }
            },
            {
              key: 'mobileNumber',
              type: 'input',
              templateOptions: {
                label: 'Mobile Number',
                placeholder: 'Mobile Number',
                required: true,
              }
            },
            {
              key: 'email',
              type: 'input',
              templateOptions: {
                label: 'E-mail',
                placeholder: 'E-mail',
              }
            },
            {
              key: 'address',
              type: 'input',
              templateOptions: {
                label: 'Address',
                placeholder: 'Address'
              }
            },

          ]
        }

      ]
    }
  ];
  constructor(private route: ActivatedRoute, private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.model = x.item;
    });
  }

  async onSubmit() {
    let res: any = await this.backend.saveRow('Rider', this.model, true, this.fields);
    if(this.model.id == null) {
      this.router.navigate(['../view', res.id], { relativeTo: this.route});
    }
  }
}
