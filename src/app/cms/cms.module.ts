import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CMSRoutingModule } from './cms-routing.module';
import { CMSComponent } from './cms.component';
import { SocketService } from '../@services/socket/socket.service';
import { BackendService } from '../@services/backend/backend.service';
import { SharedModule } from '../@components/shared.module';

@NgModule({
  declarations: [CMSComponent],
  imports: [
    CommonModule,
    CMSRoutingModule,
    SharedModule
  ],
  providers: [SocketService, BackendService]
})
export class CMSModule { }
