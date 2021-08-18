import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverProfileRoutingModule } from './driver-profile-routing.module';
import { DriverProfileComponent } from './driver-profile.component';
import { DriverProfileDetailsComponent } from './driver-profile-details/driver-profile-details.component';
import { DriverProfileFinancialComponent } from './driver-profile-financial/driver-profile-financial.component';
import { DriverProfileReviewsComponent } from './driver-profile-reviews/driver-profile-reviews.component';
import { DriverProfileDocumentsComponent } from './driver-profile-documents/driver-profile-documents.component';
import { DriverProfilePaymentRequestsComponent } from './driver-profile-payment-requests/driver-profile-payment-requests.component';
import { SharedModule } from 'src/app/@components/shared.module';


@NgModule({
  declarations: [DriverProfileComponent, DriverProfileDetailsComponent, DriverProfileFinancialComponent, DriverProfileReviewsComponent, DriverProfileDocumentsComponent, DriverProfilePaymentRequestsComponent],
  imports: [
    CommonModule,
    DriverProfileRoutingModule,
    SharedModule
  ]
})
export class DriverProfileModule { }
