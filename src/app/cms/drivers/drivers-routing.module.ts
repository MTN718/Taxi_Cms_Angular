import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', loadChildren: () => import('./drivers-all/drivers-all.module').then(m => m.DriversAllModule) },
  { path: 'pending', loadChildren: () => import('./drivers-all/drivers-all.module').then(m => m.DriversAllModule) },
  { path: 'payment-requests', loadChildren: () => import('./drivers-payment-requests/drivers-payment-requests.module').then(m => m.DriversPaymentRequestsModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversRoutingModule { }
