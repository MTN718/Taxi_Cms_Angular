import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionListComponent } from './region-list/region-list.component';
import { RegionViewComponent } from './region-view/region-view.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';
import { ItemResolver } from 'src/app/@resolvers/item.resolver';


const routes: Routes = [
  { path: '', component: RegionListComponent, resolve: { items: TableResolver }, data: {table: 'Region'}, runGuardsAndResolvers: 'always' },
  { path: 'view/:id', component: RegionViewComponent, resolve: { item: ItemResolver }, data: {table: 'Region'} },
  { path: 'new', component: RegionViewComponent, resolve: { item: ItemResolver }, data: {table: 'Region'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRegionRoutingModule { }
