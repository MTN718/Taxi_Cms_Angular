import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiderViewComponent } from './rider-view.component';
import { RiderViewInfoComponent } from './rider-view-info/rider-view-info.component';
import { RiderViewFinancialsComponent } from './rider-view-financials/rider-view-financials.component';
import { RiderViewRequestsComponent } from './rider-view-requests/rider-view-requests.component';
import { RiderViewAddressesComponent } from './rider-view-addresses/rider-view-addresses.component';
import { ItemResolver } from 'src/app/@resolvers/item.resolver';


const routes: Routes = [
  { path: '', component: RiderViewComponent, resolve: { item: ItemResolver }, data: { table: 'Rider', relations: ['wallet','media'] }, children: [
    { path: '', redirectTo: 'details' },
    { path: 'details', component: RiderViewInfoComponent },
    { path: 'financials', component: RiderViewFinancialsComponent },
    { path: 'requests', component: RiderViewRequestsComponent },
    { path: 'addresses', component: RiderViewAddressesComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiderViewRoutingModule { }
