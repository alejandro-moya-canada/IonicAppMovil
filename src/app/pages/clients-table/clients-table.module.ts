import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsTablePageRoutingModule } from './clients-table-routing.module';

import { ClientsTablePage } from './clients-table.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClientsModalPage } from '../modals/clients-modal/clients-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsTablePageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [ClientsTablePage, ClientsModalPage],
  entryComponents: [ClientsModalPage]
})
export class ClientsTablePageModule {}
