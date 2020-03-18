import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersTablePageRoutingModule } from './users-table-routing.module';

import { UsersTablePage } from './users-table.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersTablePageRoutingModule
  ],
  declarations: [UsersTablePage]
})
export class UsersTablePageModule {}
