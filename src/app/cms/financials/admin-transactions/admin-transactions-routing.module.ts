import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminTransactionsComponent } from './admin-transactions.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';


const routes: Routes = [
  { path: '', component: AdminTransactionsComponent, resolve: { items: TableResolver }, data: { table: 'AdminTransaction' }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTransactionsRoutingModule { }
