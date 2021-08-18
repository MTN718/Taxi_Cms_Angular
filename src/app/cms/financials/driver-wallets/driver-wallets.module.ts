import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverWalletsRoutingModule } from './driver-wallets-routing.module';
import { DriverWalletsListComponent } from './driver-wallets-list.component';
import { SharedModule } from 'src/app/@components/shared.module';


@NgModule({
  declarations: [DriverWalletsListComponent],
  imports: [
    CommonModule,
    DriverWalletsRoutingModule,
    SharedModule
  ]
})
export class DriverWalletsModule { }
