import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersTablePage } from './users-table.page';

const routes: Routes = [
  {
    path: '',
    component: UsersTablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersTablePageRoutingModule {}
