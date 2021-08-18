import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementFleetsRoutingModule } from './management-fleets-routing.module';
import { FleetsListComponent } from './fleets-list/fleets-list.component';
import { SharedModule } from 'src/app/@components/shared.module';


@NgModule({
  declarations: [FleetsListComponent],
  imports: [
    CommonModule,
    ManagementFleetsRoutingModule,
    SharedModule
  ]
})
export class ManagementFleetsModule { }
