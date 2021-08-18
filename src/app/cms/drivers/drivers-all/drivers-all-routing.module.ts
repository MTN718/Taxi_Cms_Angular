import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriversAllListComponent } from './drivers-all-list/drivers-all-list.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';


const routes: Routes = [
  { path: '', component: DriversAllListComponent, resolve: { drivers: TableResolver }, data: { table: 'Driver' }, runGuardsAndResolvers: 'always' },
  { path: 'view/:id', loadChildren: () => import('./driver-profile/driver-profile.module').then(m => m.DriverProfileModule) },
  { path: 'new', loadChildren: () => import('./driver-profile/driver-profile.module').then(m => m.DriverProfileModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversAllRoutingModule { }
