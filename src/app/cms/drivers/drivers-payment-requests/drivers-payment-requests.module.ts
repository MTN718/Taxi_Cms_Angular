import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriversPaymentRequestsRoutingModule } from './drivers-payment-requests-routing.module';
import { PaymentRequestsListComponent } from './payment-requests-list/payment-requests-list.component';
import { PaymentRequestViewComponent } from './payment-request-view/payment-request-view.component';
import { SharedModule } from 'src/app/@components/shared.module';


@NgModule({
  declarations: [PaymentRequestsListComponent, PaymentRequestViewComponent],
  imports: [
    CommonModule,
    DriversPaymentRequestsRoutingModule,
    SharedModule
  ]
})
export class DriversPaymentRequestsModule { }
