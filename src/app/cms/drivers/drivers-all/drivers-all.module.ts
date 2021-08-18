import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversAllRoutingModule } from './drivers-all-routing.module';
import { DriversAllListComponent } from './drivers-all-list/drivers-all-list.component';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { SharedModule } from 'src/app/@components/shared.module';

@NgModule({
  declarations: [DriversAllListComponent],
  imports: [
    CommonModule,
    DriversAllRoutingModule,
    SharedModule
  ],
  providers: [TagColorService]
})
export class DriversAllModule { }
