import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RidersListComponent } from './riders-list/riders-list.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';


const routes: Routes = [
  { path: '', component: RidersListComponent, resolve: { items: TableResolver }, data: { table: 'Rider' }, runGuardsAndResolvers: 'always' },
  { path: 'view/:id', loadChildren: () => import('./rider-view/rider-view.module').then(m => m.RiderViewModule) },
  { path: 'new', loadChildren: () => import('./rider-view/rider-view.module').then(m => m.RiderViewModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RidersRoutingModule { }
