import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'coupons' },
  { path: 'coupons', loadChildren: () => import('./coupons/coupons.module').then(m => m.CouponsModule) },
  { path: 'promotions', loadChildren: () => import('./promotions/promotions.module').then(m => m.PromotionsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
