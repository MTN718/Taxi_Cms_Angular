import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { Promotion } from 'src/app/@models/entities/promotion';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-promotion-view',
  templateUrl: './promotion-view.component.html',
  styleUrls: ['./promotion-view.component.css']
})
export class PromotionViewComponent implements OnInit {
  dates: Date[] = [];
  form = new FormGroup({});
  model: Promotion = {};
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
            title: 'Content'
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
    await this.backend.saveRow('Promotion', this.model);
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

}
