import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { NzResultModule, NzModalService } from 'ng-zorro-antd';
import { ConfigRoutingModule } from './config-routing.module';
import { SharedModule } from '../@components/shared.module';



@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    SharedModule,
    NzResultModule,
  ],
  providers: [NzModalService]
})
export class ConfigModule { }
