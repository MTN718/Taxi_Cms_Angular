import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FleetsListComponent } from './fleets-list/fleets-list.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';


const routes: Routes = [
  { path: '', component: FleetsListComponent, resolve: { items: TableResolver }, data: {table: 'Fleet'} },
  { path: 'view/:id', loadChildren: () => import('./fleet-view/fleet-view.module').then(m => m.FleetViewModule) },
  { path: 'new', loadChildren: () => import('./fleet-view/fleet-view.module').then(m => m.FleetViewModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementFleetsRoutingModule { }
