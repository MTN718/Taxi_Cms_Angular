import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestViewInfoComponent } from './request-view-info/request-view-info.component';
import { RequestViewComponent } from './request-view.component';
import { RequestViewComplaintsComponent } from './request-view-complaints/request-view-complaints.component';
import { RequestViewFinancialsComponent } from './request-view-financials/request-view-financials.component';
import { RequestViewChatsComponent } from './request-view-chats/request-view-chats.component';
import { ItemResolver } from 'src/app/@resolvers/item.resolver';


const routes: Routes = [
  { path: '', component: RequestViewComponent, resolve: {item: ItemResolver }, data: {table: 'Request', relations: ['driver', 'rider', 'service','driverTransactions','riderTransactions','riderTransactions.paymentGateway','adminTransactions','fleetTransactions','travelChats','complaints']}, children: [
    { path: '', redirectTo: 'info' },
    { path: 'info', component: RequestViewInfoComponent },
    { path: 'complaints', component: RequestViewComplaintsComponent },
    { path: 'financials', component: RequestViewFinancialsComponent },
    { path: 'chats', component: RequestViewChatsComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestViewRoutingModule { }
