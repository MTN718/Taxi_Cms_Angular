import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RidersRoutingModule } from './riders-routing.module';
import { RidersListComponent } from './riders-list/riders-list.component';
import { SharedModule } from 'src/app/@components/shared.module';


@NgModule({
  declarations: [RidersListComponent],
  imports: [
    CommonModule,
    RidersRoutingModule,
    SharedModule
  ],
  providers: []
})
export class RidersModule { }
