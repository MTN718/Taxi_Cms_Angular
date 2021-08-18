import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionsListComponent } from './promotions-list/promotions-list.component';
import { PromotionViewComponent } from './promotion-view/promotion-view.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';
import { ItemResolver } from 'src/app/@resolvers/item.resolver';


const routes: Routes = [
  { path: '', component: PromotionsListComponent, resolve: { items: TableResolver }, data: { table: 'Promotion' }, runGuardsAndResolvers: 'always' },
  { path: 'view/:id', component: PromotionViewComponent, resolve: { item: ItemResolver }, data: {table: 'Promotion'}},
  { path: 'new', component: PromotionViewComponent, resolve: { item: ItemResolver }, data: {table: 'Promotion'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionsRoutingModule { }
