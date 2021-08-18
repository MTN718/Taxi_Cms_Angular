import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementCarsRoutingModule } from './management-cars-routing.module';
import { ManagementCarsListComponent } from './management-cars-list/management-cars-list.component';
import { SharedModule } from 'src/app/@components/shared.module';


@NgModule({
  declarations: [ ManagementCarsListComponent ],
  imports: [
    CommonModule,
    ManagementCarsRoutingModule,
    SharedModule
  ],
  providers: []
})
export class ManagementCarsModule { }
