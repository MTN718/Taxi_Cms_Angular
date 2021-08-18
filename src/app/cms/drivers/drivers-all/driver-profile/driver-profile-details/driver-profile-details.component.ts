import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { Service } from 'src/app/@models/entities/service';
import { Car } from 'src/app/@models/entities/car';
import { Driver } from 'src/app/@models/entities/driver';
import { Fleet } from 'src/app/@models/entities/fleet';
import { environment } from 'src/environments/environment';
import { Media } from 'src/app/@models/entities/media';

@Component({
  selector: 'app-driver-profile-details',
  templateUrl: './driver-profile-details.component.html',
  styleUrls: ['./driver-profile-details.component.css']
})
export class DriverProfileDetailsComponent implements OnInit {
  form = new FormGroup({});
  model: Driver;
  services: any[] = [];
  root: string;
  showUploadList = {
    showRemoveIcon: true
  };
  fileList = [];
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
                  { label: 'Unkniwn', value: 'unknown' },
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
            }
          ]
        },
        {
          type: 'flex-layout',
          templateOptions: {
            fxLayout: 'row',
            title: 'Ride Information'
          },
          fieldGroup: [
            {
              key: 'fleet',
              type: 'select',
              templateOptions: {
                label: 'Owner Fleet',
                options: []
              }
            },
            {
              key: 'car',
              type: 'select',
              templateOptions: {
                label: 'Ride Model',
                placeholder: 'Ride Model',
                options: []
              }
            },
            {
              key: 'carColor',
              type: 'input',
              templateOptions: {
                label: 'Ride Color',
                placeholder: 'Ride Color'
              }
            },
            {
              key: 'carProductionYear',
              type: 'input',
              defaultValue: 2020,
              templateOptions: {
                label: 'Ride Make',
                placeholder: 'Ride Make',
                type: 'number',
                min: 1900,
                max: 2050
              }
            },
            {
              key: 'carPlate',
              type: 'input',
              templateOptions: {
                label: 'Ride Plate Number',
                placeholder: 'Ride Plate Number',
                maxLength: 15
              }
            }
          ]
        },
        {
          type: 'flex-layout',
          templateOptions: {
            fxLayout: 'row',
            title: 'Private Information'
          },
          fieldGroup: [
            {
              key: 'certificateNumber',
              type: 'input',
              templateOptions: {
                label: 'Certificate Number',
                placeholder: 'Certificate Number'
              }
            },
            {
              key: 'bankName',
              type: 'input',
              templateOptions: {
                label: 'Bank Name',
                placeholder: 'Bank Name'
              }
            },
            {
              key: 'accountNumber',
              type: 'input',
              templateOptions: {
                label: 'Account Number',
                placeholder: 'Account Number'
              }
            },
            {
              key: 'bankRoutingNumber',
              type: 'input',
              templateOptions: {
                label: 'Bank Routing Number',
                placeholder: 'Bank Routing Number'
              }
            },
            {
              key: 'bankSwift',
              type: 'input',
              templateOptions: {
                label: 'Bank Swift Number',
                placeholder: 'Bank Swift Number'
              }
            },
          ]
        },

      ]
    }
  ];
  constructor(private route: ActivatedRoute, private backend: BackendService, private router: Router) {
    this.root = environment.root;
   }

  ngOnInit(): void {
    this.route.data.subscribe(async (x) => {
      this.model = x.item;
      if(x.item.media != null) {
        let media = (await this.backend.getRows<Media>({table: 'Media', filters: {id: x.item.media}})).data[0];
        this.fileList.push({
          uid: -1,
          name: media.title,
          status: 'done',
          url: environment.root + media.address
        });
      }
      this.fileList = this.fileList.slice()
      this.backend.getRows<Car>({table: 'Car'}).then(y => {
        this.backend.getField('car', this.fields).templateOptions.options = y.data.map(z => { return { label: z.title, value: z.id }});
      })
      this.backend.getRows<Fleet>({table: 'Fleet'}).then(y => {
        this.backend.getField('fleet', this.fields).templateOptions.options = y.data.map(z => { return { label: z.name, value: z.id }});
      });
      this.backend.getRows<Service>({ table: 'Service'}).then(y => {
        this.services = y.data.map(z => {
          return {
          key: z.id,
          title: z.title,
          direction: (this.model.services == null || this.model.services.filter(i=>i == z.id).length < 1) ? 'left' : 'right'
          }
        });
      });
    })
  }

  async onSubmit() {
    this.model.services = this.services.filter(x => x.direction == 'right').map(x => { return {id: x.key}});
    let res: any = await this.backend.saveRow('Driver', this.model, true, this.fields, ['services', 'media']);
    if(this.model.id == null) {
      this.router.navigate(['../view', res.id], { relativeTo: this.route});
    }
  }

  uploaded(event: any) {
    if(event.type == 'success') {
      this.model.media = event.file.response;
    } else {
      this.model.media = null;
    }
  }
}