import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTransactionsRoutingModule } from './admin-transactions-routing.module';
import { AdminTransactionsComponent } from './admin-transactions.component';
import { SharedModule } from 'src/app/@components/shared.module';
import { NzDropDownModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [AdminTransactionsComponent],
  imports: [
    CommonModule,
    AdminTransactionsRoutingModule,
    SharedModule
  ]
})
export class AdminTransactionsModule { }
