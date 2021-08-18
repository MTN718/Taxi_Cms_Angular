import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementServicesListComponent } from './management-services-list/management-services-list.component';
import { ManagementServicesViewComponent } from './management-services-view/management-services-view.component';
import { ManagementServiceCategoryViewComponent } from './management-service-category-view/management-service-category-view.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';
import { ItemResolver } from 'src/app/@resolvers/item.resolver';


const routes: Routes = [
  { path: '', component: ManagementServicesListComponent, resolve: { items: TableResolver }, data: { table: 'ServiceCategory', relations: ['services']}, runGuardsAndResolvers: 'always' },
  { path: 'view/:id', component: ManagementServicesViewComponent, resolve: { item: ItemResolver }, data: { table: 'Service'} },
  { path: 'new', component: ManagementServicesViewComponent, resolve: { item: ItemResolver }, data: { table: 'Service'} },
  { path: 'category/view/:id', component: ManagementServiceCategoryViewComponent, resolve: { item: ItemResolver }, data: { table: 'ServiceCategory'} },
  { path: 'category/new', component: ManagementServiceCategoryViewComponent, resolve: { item: ItemResolver }, data: { table: 'ServiceCategory'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementServicesRoutingModule { }
