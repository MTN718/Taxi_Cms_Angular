import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Service } from 'src/app/@models/entities/service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { Region } from 'src/app/@models/entities/region';
import { ServiceCategory } from 'src/app/@models/entities/service-category';
import { environment } from 'src/environments/environment';
import { Media } from 'src/app/@models/entities/media';

@Component({
  selector: 'app-management-services-view',
  templateUrl: './management-services-view.component.html',
  styleUrls: ['./management-services-view.component.css']
})
export class ManagementServicesViewComponent implements OnInit {
  form = new FormGroup({});
  model: Service = {};
  root: string;
  showUploadList = {
    showRemoveIcon: true
  };
  fileList = [];
  services: any[] = [];
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
              key: 'title',
              type: 'input',
              templateOptions: {
                label: 'Title',
                placeholder: 'Title',
                required: true
              }
            },
            {
              key: 'category',
              type: 'select',
              templateOptions: {
                label: 'Category',
                placeholder: 'Category',
                required: true,
                options: []
              }
            }
          ]
        },
        {
          type: 'flex-layout',
          templateOptions: {
            fxLayout: 'row',
            title: 'Fee Calculation'
          },
          fieldGroup: [
            {
              key: 'distanceFeeMode',
              type: 'select',
              templateOptions: {
                label: 'Distance Fee Mode',
                placeholder: 'Distance Fee Mode',
                options: [
                  { label: 'None', value: 'None' },
                  { label: 'Pickup To Destination', value: 'PickupToDestination' }
                ]
              }
            },
            {
              key: 'baseFare',
              type: 'input',
              templateOptions: {
                label: 'Base Fare',
                placeholder: 'Base Fare',
                type: 'number'
              }
            },
            {
              key: 'perHundredMeters',
              type: 'input',
              templateOptions: {
                label: 'Per 100m',
                placeholder: 'Per 100m',
                type: 'number'
              }
            },
            {
              key: 'perMinuteDrive',
              type: 'input',
              templateOptions: {
                label: 'Per Minute',
                placeholder: 'Per Minute',
                type: 'number'
              }
            },
            {
              key: 'minimumFee',
              type: 'input',
              templateOptions: {
                label: 'Minimum Fee',
                placeholder: 'Minimum Fee',
                type: 'number'
              }
            }
          ]
        },
        {
          type: 'flex-layout',
          templateOptions: {
            fxLayout: 'row',
            title: 'Estimation'
          },
          fieldGroup: [
            {
              key: 'feeEstimationMode',
              type: 'select',
              templateOptions: {
                label: 'Fee Estimation Mode',
                placeholder: 'Fee Estimation Mode',
                options: [
                  { label: 'Static', value: 'Static' },
                  { label: 'Dynamic', value: 'Dynamic' },
                  { label: 'Ranged', value: 'Ranged' },
                  { label: 'Ranged Strict', value: 'RangedStrict' },
                  { label: 'Disabled', value: 'Disabled' }
                ]
              }
            },
            {
              key: 'rangeMinusPercent',
              type: 'input',
              templateOptions: {
                label: 'Minus Percent',
                placeholder: 'Minus Percent',
                type: 'number',
                min: 0,
                max: 100
              }
            },
            {
              key: 'rangePlusPercent',
              type: 'input',
              templateOptions: {
                label: 'Plus Percent',
                placeholder: 'Plus Percent',
                type: 'number',
                min: 0,
                max: 100
              }
            }
          ]
        },
        {
          type: 'flex-layout',
          templateOptions: {
            fxLayout: 'row',
            title: 'Payment'
          },
          fieldGroup: [
            {
              key: 'paymentMethod',
              type: 'select',
              templateOptions: {
                label: 'Payment Method',
                placeholder: 'Payment Method',
                options: [
                  { label: 'Cash & Credit', value: 'CashCredit' },
                  { label: 'Only Credit', value: 'OnlyCredit' },
                  { label: 'Only Cash', value: 'OnlyCash' }
                ]
              }
            },
            {
              key: 'providerSharePercent',
              type: 'input',
              templateOptions: {
                label: 'Commission Percent',
                placeholder: 'Commission Percent',
                type: 'number',
                min: 0,
                max: 100
              }
            },
            {
              key: 'providerShareFlat',
              type: 'input',
              templateOptions: {
                label: 'Commission Flat',
                placeholder: 'Commission Flat',
                type: 'number',
                min: 0,
              }
            }
          ]
        },
        {
          type: 'flex-layout',
          templateOptions: {
            fxLayout: 'row',
            title: 'Misc'
          },
          fieldGroup: [
            {
              key: 'bookingMode',
              type: 'select',
              templateOptions: {
                label: 'Booking Mode',
                options: [
                  { label: 'Only Now', value: 'OnlyNow' },
                  { label: 'Time', value: 'Time' },
                  { label: 'Date & Time', value: 'DateTime' },
                  { label: 'Date & Time (Only Abosolute Hour)', value: 'DateTimeAbosoluteHour' }
                ]
              }
            },
            {
              key: 'maxDestinationDistance',
              type: 'input',
              templateOptions: {
                label: 'Maximum Destination Distance (meters)',
                type: 'number',
                min: 0
              }
            },
            {
              key: 'searchRadius',
              type: 'input',
              templateOptions: {
                label: 'Search Radius (meters)',
                type: 'number',
                min: 0
              }
            }
          ]
        },
        {
          key: 'canEnableVerificationCode',
          type: 'checkbox',
          templateOptions: {
            label: 'Verification Available'
          }
        }

      ]
    }
  ];
  constructor(private route: ActivatedRoute, private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.root = environment.root;
    this.route.data.subscribe(x => {
      this.model = x.item;
      if(x.item.media != null) {
        this.backend.getRows<Media>({ table: 'Media', filters: {id: x.item.media}}).then(y => {
          this.fileList.push({
            uid: -1,
            name: y.data[0].title,
            status: 'done',
            url: environment.root + y.data[0].address
          });
          this.fileList = this.fileList.slice()
        })
      }
      this.backend.getRows<ServiceCategory>({table: 'ServiceCategory'}).then(y => {
        this.backend.getField('category', this.fields).templateOptions.options = y.data.map(z => { return { label: z.title, value: z.id }})
      })
      this.backend.getRows<Region>({ table: 'Region'}).then(y => {
        this.services = y.data.map(z => {
          return {
          key: z.id,
          title: z.name,
          direction: (this.model.regions == null || this.model.regions.filter(i=>i == z.id).length < 1) ? 'left' : 'right'
          }
        });
      });
    });
  }

  async onSubmit() {
    this.model.regions = this.services.filter(x => x.direction == 'right').map(x => { return {id: x.key}});
    await this.backend.saveRow('Service', this.model, true, this.fields, ['media', 'regions']);
    if(this.model.id == null) {
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../../'], {relativeTo: this.route});
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
