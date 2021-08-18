import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestViewRoutingModule } from './request-view-routing.module';
import { RequestViewInfoComponent } from './request-view-info/request-view-info.component';
import { RequestViewComponent } from './request-view.component';
import { RequestViewComplaintsComponent } from './request-view-complaints/request-view-complaints.component';
import { RequestViewFinancialsComponent } from './request-view-financials/request-view-financials.component';
import { RequestViewChatsComponent } from './request-view-chats/request-view-chats.component';
import { SharedModule } from 'src/app/@components/shared.module';


@NgModule({
  declarations: [RequestViewComponent,RequestViewInfoComponent, RequestViewComplaintsComponent, RequestViewFinancialsComponent, RequestViewChatsComponent],
  imports: [
    CommonModule,
    RequestViewRoutingModule,
    SharedModule
  ]
})
export class RequestViewModule { }
