import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { NzMessageService } from 'ng-zorro-antd';
import { PaymentGatewayType, PaymentGateway } from 'src/app/@models/entities/payment-gateway';

@Component({
  selector: 'app-payment-gateway-view',
  templateUrl: './payment-gateway-view.component.html',
  styleUrls: ['./payment-gateway-view.component.css']
})
export class PaymentGatewayViewComponent implements OnInit {
  form = new FormGroup({});
  model: PaymentGateway = {};
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
              key: 'type',
              type: 'select',
              defaultValue: this.model.type,
              templateOptions: {
                label: 'Type',
                placeholder: 'Type',
                required: true,
                
                options: Object.values(PaymentGatewayType).map(x => { return { label: x, text: x, value: x } })
              }
            },
            {
              key: 'title',
              type: 'input',
              templateOptions: {
                label: 'Title',
                placeholder: 'Title',
                required: true,
              }
            },
            {
              key: 'publicKey',
              type: 'input',
              templateOptions: {
                label: 'Public Key',
                placeholder: 'Public Key',
                required: true,
              }
            },
            {
              key: 'privateKey',
              type: 'input',
              templateOptions: {
                label: 'Private Key',
                placeholder: 'Private Key',
                type: 'password',
                required: true,
              }
            },
            {
              key: 'merchantId',
              type: 'input',
              templateOptions: {
                label: 'Merchant Id',
                placeholder: 'Merchant Id'
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
    await this.backend.saveRow('PaymentGateway', this.model);
    if(this.model.id == null) {
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
  }
}
