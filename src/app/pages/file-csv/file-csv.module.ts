import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileCSVPageRoutingModule } from './file-csv-routing.module';

import { FileCSVPage } from './file-csv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileCSVPageRoutingModule
  ],
  declarations: [FileCSVPage]
})
export class FileCSVPageModule {}
