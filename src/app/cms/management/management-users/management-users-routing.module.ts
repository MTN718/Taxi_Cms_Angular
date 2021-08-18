import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserViewComponent } from './user-view/user-view.component';
import { TableResolver } from 'src/app/@resolvers/table.resolver';
import { ItemResolver } from 'src/app/@resolvers/item.resolver';


const routes: Routes = [
  { path: '', component: UsersListComponent, resolve: { items: TableResolver }, data: {table: 'Operator'}, runGuardsAndResolvers: 'always' },
  { path: 'view/:id', component: UserViewComponent, resolve: { item: ItemResolver }, data: {table: 'Operator'} },
  { path: 'new', component: UserViewComponent, resolve: { item: ItemResolver }, data: {table: 'Operator'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementUsersRoutingModule { }
