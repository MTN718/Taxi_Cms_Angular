import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetViewRoutingModule } from './fleet-view-routing.module';
import { FleetViewDetailsComponent } from './fleet-view-details/fleet-view-details.component';
import { FleetViewFinancialsComponent } from './fleet-view-financials/fleet-view-financials.component';
import { FleetViewComponent } from './fleet-view.component';
import { SharedModule } from 'src/app/@components/shared.module';


@NgModule({
  declarations: [FleetViewComponent, FleetViewDetailsComponent, FleetViewFinancialsComponent],
  imports: [
    CommonModule,
    FleetViewRoutingModule,
    SharedModule
  ],
  providers: []
})
export class FleetViewModule { }
