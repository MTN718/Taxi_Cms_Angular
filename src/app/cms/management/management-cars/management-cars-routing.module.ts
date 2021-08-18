import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementCarsListComponent } from './management-cars-list/management-cars-list.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';


const routes: Routes = [
  { path: '', component: ManagementCarsListComponent, resolve: { items: TableResolver }, data: {table: 'Car'}, runGuardsAndResolvers: 'paramsOrQueryParamsChange' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementCarsRoutingModule { }
