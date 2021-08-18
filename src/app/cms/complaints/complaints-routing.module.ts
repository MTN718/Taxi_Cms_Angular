import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplaintsListComponent } from './complaints-list/complaints-list.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';

const routes: Routes = [
  { path: '', component: ComplaintsListComponent, resolve: { items: TableResolver }, data: { table: 'Complaint'}, runGuardsAndResolvers: 'always' },
  { path: 'view/:id', loadChildren: () => import('./complaint-view/complaint-view.module').then(m => m.ComplaintViewModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintsRoutingModule { }
