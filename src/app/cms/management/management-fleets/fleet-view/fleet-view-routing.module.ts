import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FleetViewDetailsComponent } from './fleet-view-details/fleet-view-details.component';
import { FleetViewFinancialsComponent } from './fleet-view-financials/fleet-view-financials.component';
import { FleetViewComponent } from './fleet-view.component';
import { ItemResolver } from 'src/app/@resolvers/item.resolver';


const routes: Routes = [
  {
    path: '', component: FleetViewComponent, resolve: { item: ItemResolver }, data: {table: 'Fleet', relations: ['wallet']}, children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: FleetViewDetailsComponent },
      { path: 'financials', component: FleetViewFinancialsComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetViewRoutingModule { }
