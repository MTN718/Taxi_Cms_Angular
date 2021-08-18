import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FleetWalletsListComponent } from './fleet-wallets-list.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';


const routes: Routes = [
  { path: '', component: FleetWalletsListComponent, resolve: { items: TableResolver }, data: { table: 'FleetWallet', relations: ['fleet'] }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetWalletsRoutingModule { }
