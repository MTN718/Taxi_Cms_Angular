import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Form } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { Coupon } from 'src/app/@models/entities/coupon';
import { NzRangePickerComponent, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-coupon-view',
  templateUrl: './coupon-view.component.html',
  styleUrls: ['./coupon-view.component.css']
})
export class CouponViewComponent implements OnInit {
  dates: Date[] = [];
  form = new FormGroup({});
  model: Coupon = {};
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
            title: 'Usage Conditions'
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
              key: 'description',
              type: 'input',
              templateOptions: {
                label: 'Description',
                placeholder: 'Description',
                required: true,
              }
            },
            {
              key: 'code',
              type: 'input',
              templateOptions: {
                label: 'Code',
                placeholder: 'Code',
                required: true,
              }
            },
            {
              key: 'manyUsersCanUse',
              type: 'input',
              templateOptions: {
                label: '# Users can use',
                placeholder: '# Users can use',
                type: 'number',
                required: true,
              }
            },
            {
              key: 'manyTimesUserCanUse',
              type: 'input',
              templateOptions: {
                label: '# Every user can use',
                placeholder: '# Every user can use',
                type: 'number',
                required: true
              }
            }
          ]
        },
        {
          type: 'flex-layout',
          templateOptions: {
            fxLayout: 'row',
            title: 'Calculations'
          },
          fieldGroup: [
            {
              key: 'minimumCost',
              type: 'input',
              templateOptions: {
                label: 'Minimum Cost',
                placeholder: 'Minimum Cost',
                type: 'number',
                required: true
              }
            },
            {
              key: 'maximumCost',
              type: 'input',
              templateOptions: {
                label: 'Maximum Cost',
                placeholder: 'Maximum Cost',
                type: 'number',
                required: true
              }
            },
            {
              key: 'discountPercent',
              type: 'input',
              templateOptions: {
                label: 'Discount Percent',
                placeholder: 'Discount Percent',
                type: 'number',
                required: true
              }
            },
            {
              key: 'discountFlat',
              type: 'input',
              templateOptions: {
                label: 'Discount Flat',
                placeholder: 'Discount Flat',
                type: 'number',
                required: true
              }
            },
            {
              key: 'creditGift',
              type: 'input',
              templateOptions: {
                label: 'Credit Gift',
                placeholder: 'Credit Gift',
                type: 'number',
                required: true
              }
            },
            
          ]
        },
        {
          type: 'flex-layout',
          templateOptions: {
            fxLayout: 'row',
            title: ''
          },
          fieldGroup: [
            {
              key: 'isFirstTravelOnly',
              type: 'checkbox',
              templateOptions: {
                label: 'First travel only',
                required: true
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
      if(x.item.startTimestamp != null)
        this.dates = [new Date(x.item.startTimestamp), new Date(x.item.expirationTimestamp)]
    });
  }

  async onSubmit() {
    if(this.dates.length == 0) {
      this.message.error('Please Enter date');
      return;
    }
    this.model.startTimestamp = this.dates[0].getTime();
    this.model.expirationTimestamp = this.dates[1].getTime();
    await this.backend.saveRow('Coupon', this.model);
    if(this.model.id == null) {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
  }
}
