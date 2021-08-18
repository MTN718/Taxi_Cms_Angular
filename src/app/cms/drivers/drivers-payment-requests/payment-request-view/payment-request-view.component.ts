import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { SocketService } from 'src/app/@services/socket/socket.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { PaymentRequestStatus } from 'src/app/@models/entities/payment-request';

@Component({
  selector: 'app-payment-request-view',
  templateUrl: './payment-request-view.component.html',
  styleUrls: ['./payment-request-view.component.css']
})
export class PaymentRequestViewComponent implements OnInit {
  item: any;
  tagColor: TagColorService;
  form = new FormGroup({});
  formReq = {};
  driverId = 0;
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
              key: 'amount',
              type: 'input',
              templateOptions: {
                label: 'Amount',
                placeholder: 'Amount',
                required: true,
              }
            },
            {
              key: 'currency',
              type: 'select',
              templateOptions: {
                label: 'Currency',
                placeholder: 'Currency',
                options: []
              }
            },
            {
              key: 'documentNumber',
              type: 'input',
              templateOptions: {
                label: 'Document Number',
                placeholder: 'Document Number',
                required: true,
              }
            },
            {
              key: 'details',
              type: 'input',
              templateOptions: {
                label: 'Details',
                placeholder: 'Details',
              }
            }
          ]
        }

      ]
    }
  ];


  constructor(private router: Router, private _tagColor: TagColorService, private route: ActivatedRoute, private socket: SocketService, private backend: BackendService) {
    this.tagColor = _tagColor;
  }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.item = x.item;
      this.backend.getField('currency', this.fields).templateOptions.options = x.item.driver.wallet.map(x => { return  {label: x.currency, value: x.currency}});
    });
  }

  

  async onSubmit() {
    let x = JSON.parse(JSON.stringify(this.formReq));
    x.driverId = this.item.driver.id;
    await this.socket.emit('insertPayment', x, (result) => {
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { refresh: new Date().getTime() },
          queryParamsHandling: 'merge',
        });
    });
  }

  async changeStatus(status: string) {
    await this.backend.saveRow('PaymentRequest', { id: this.item.id, status: status });
    this.item.status = status as PaymentRequestStatus;
  }
}
