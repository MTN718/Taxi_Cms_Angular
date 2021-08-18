import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponsListComponent } from './coupons-list/coupons-list.component';
import { CouponViewComponent } from './coupon-view/coupon-view.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';
import { ItemResolver } from 'src/app/@resolvers/item.resolver';


const routes: Routes = [
  { path: '', component: CouponsListComponent, resolve: { items: TableResolver }, data: {table: 'Coupon'}, runGuardsAndResolvers: 'always' },
  { path: 'view/:id', component: CouponViewComponent, resolve: { item: ItemResolver }, data: {table: 'Coupon'} },
  { path: 'new', component: CouponViewComponent, resolve: { item: ItemResolver }, data: {table: 'Coupon'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponsRoutingModule { }
