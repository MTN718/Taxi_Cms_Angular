import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetWalletsRoutingModule } from './fleet-wallets-routing.module';
import { FleetWalletsListComponent } from './fleet-wallets-list.component';
import { SharedModule } from 'src/app/@components/shared.module';


@NgModule({
  declarations: [FleetWalletsListComponent],
  imports: [
    CommonModule,
    FleetWalletsRoutingModule,
    SharedModule
  ]
})
export class FleetWalletsModule { }
