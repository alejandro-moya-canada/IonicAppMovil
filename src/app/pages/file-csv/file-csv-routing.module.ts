import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileCSVPage } from './file-csv.page';

const routes: Routes = [
  {
    path: '',
    component: FileCSVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileCSVPageRoutingModule {}
