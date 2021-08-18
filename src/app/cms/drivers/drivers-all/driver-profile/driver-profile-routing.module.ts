import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverProfileDetailsComponent } from './driver-profile-details/driver-profile-details.component';
import { DriverProfileFinancialComponent } from './driver-profile-financial/driver-profile-financial.component';
import { DriverProfileComponent } from './driver-profile.component';
import { DriverProfileReviewsComponent } from './driver-profile-reviews/driver-profile-reviews.component';
import { DriverProfileDocumentsComponent } from './driver-profile-documents/driver-profile-documents.component';
import { DriverProfilePaymentRequestsComponent } from './driver-profile-payment-requests/driver-profile-payment-requests.component';
import { ItemResolver } from 'src/app/@resolvers/item.resolver';

const routes: Routes = [
  {
    path: '', component: DriverProfileComponent, resolve: { item: ItemResolver }, data: {table: 'Driver'}, runGuardsAndResolvers: 'paramsOrQueryParamsChange', children: [
      { path: '', pathMatch: 'full', redirectTo: 'details' },
      { path: 'details', component: DriverProfileDetailsComponent },
      { path: 'financial', component: DriverProfileFinancialComponent },
      { path: 'reviews', component: DriverProfileReviewsComponent },
      { path: 'documents', component: DriverProfileDocumentsComponent },
      { path: 'payment-requests', component: DriverProfilePaymentRequestsComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DriverProfileRoutingModule { }
