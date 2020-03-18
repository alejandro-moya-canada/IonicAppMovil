import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsTablePage } from './clients-table.page';

const routes: Routes = [
  {
    path: '',
    component: ClientsTablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsTablePageRoutingModule {}
