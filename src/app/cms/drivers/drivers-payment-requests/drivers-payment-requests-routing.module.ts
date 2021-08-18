import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentRequestsListComponent } from './payment-requests-list/payment-requests-list.component';
import { PaymentRequestViewComponent } from './payment-request-view/payment-request-view.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';
import { ItemResolver } from 'src/app/@resolvers/item.resolver';


const routes: Routes = [
  { path: '', component: PaymentRequestsListComponent, resolve: { items: TableResolver }, data: {table: 'PaymentRequest'}, runGuardsAndResolvers: 'always' },
  { path: 'view/:id', component: PaymentRequestViewComponent, resolve: {item: ItemResolver }, data: {table: 'PaymentRequest', relations: ['driver', 'driver.wallet']}, runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversPaymentRequestsRoutingModule { }
