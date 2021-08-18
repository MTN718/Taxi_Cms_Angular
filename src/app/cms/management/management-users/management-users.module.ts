import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementUsersRoutingModule } from './management-users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserViewComponent } from './user-view/user-view.component';
import { SharedModule } from 'src/app/@components/shared.module';


@NgModule({
  declarations: [UsersListComponent, UserViewComponent],
  imports: [
    CommonModule,
    ManagementUsersRoutingModule,
    SharedModule
  ]
})
export class ManagementUsersModule { }
