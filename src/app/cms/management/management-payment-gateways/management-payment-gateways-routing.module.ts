import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentGatewaysListComponent } from './payment-gateways-list/payment-gateways-list.component';
import { PaymentGatewayViewComponent } from './payment-gateway-view/payment-gateway-view.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';
import { ItemResolver } from 'src/app/@resolvers/item.resolver';


const routes: Routes = [
  { path: '', component: PaymentGatewaysListComponent, resolve: {items: TableResolver }, data: {table: 'PaymentGateway'}, runGuardsAndResolvers: 'always'},
  { path: 'view/:id', component: PaymentGatewayViewComponent, resolve: {item: ItemResolver }, data: {table: 'PaymentGateway'} },
  { path: 'new', component: PaymentGatewayViewComponent, resolve: {item: ItemResolver }, data: {table: 'PaymentGateway'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementPaymentGatewaysRoutingModule { }
