import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiderViewRoutingModule } from './rider-view-routing.module';
import { RiderViewComponent } from './rider-view.component';
import { RiderViewInfoComponent } from './rider-view-info/rider-view-info.component';
import { RiderViewFinancialsComponent } from './rider-view-financials/rider-view-financials.component';
import { RiderViewAddressesComponent } from './rider-view-addresses/rider-view-addresses.component';
import { RiderViewRequestsComponent } from './rider-view-requests/rider-view-requests.component';
import { SharedModule } from 'src/app/@components/shared.module';


@NgModule({
  declarations: [RiderViewComponent, RiderViewInfoComponent, RiderViewFinancialsComponent, RiderViewAddressesComponent, RiderViewRequestsComponent],
  imports: [
    CommonModule,
    RiderViewRoutingModule,
    SharedModule
  ]
})
export class RiderViewModule { }
