import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplaintViewComponent } from './complaint-view.component';
import { ComplaintViewInfoComponent } from './complaint-view-info/complaint-view-info.component';
import { ComplaintViewRecordsComponent } from './complaint-view-records/complaint-view-records.component';
import { ItemResolver } from 'src/app/@resolvers/item.resolver';


const routes: Routes = [
  { path: '', component: ComplaintViewComponent, resolve: { item: ItemResolver }, data: {table: 'Complaint', relations: ['request', 'request.driver', 'request.rider']}, children: [
    { path: '', redirectTo: 'info' },
    { path: 'info', component: ComplaintViewInfoComponent },
    { path: 'records', component: ComplaintViewRecordsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ComplaintViewRoutingModule { }
