import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';


const routes: Routes = [
  { path: '', component: RequestsListComponent, resolve: { items: TableResolver }, data: {table: 'Request'}, runGuardsAndResolvers: 'always' },
  { path: 'view/:id', loadChildren: () => import('./request-view/request-view.module').then(m => m.RequestViewModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
