import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiderWalletsListComponent } from './rider-wallets-list.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';


const routes: Routes = [
  { path: '', component: RiderWalletsListComponent, resolve: { items: TableResolver }, data: { table: 'RiderWallet', relations: ['rider'] }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiderWalletsRoutingModule { }
