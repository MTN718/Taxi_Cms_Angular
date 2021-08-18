import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverWalletsListComponent } from './driver-wallets-list.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';


const routes: Routes = [
  { path: '', component: DriverWalletsListComponent, resolve: { items: TableResolver }, data: { table: 'DriverWallet', relations: ['driver'] }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverWalletsRoutingModule { }
