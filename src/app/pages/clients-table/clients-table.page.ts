import { Component, OnInit } from '@angular/core';
import data from '../../../assets/data/company.json';
import { ModalController } from '@ionic/angular';
import { ClientsModalPage } from '../modals/clients-modal/clients-modal.page';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.page.html',
  styleUrls: ['./clients-table.page.scss'],
})
export class ClientsTablePage implements OnInit {

  private companies = data;
  tableStyle = 'bootstrap';
  customRowClass = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  // cambiar el estilo a oscuro de bootstrap
  switchStyle() {
    if(this.tableStyle == 'dark') {
      this.tableStyle = 'bootstrap';
    } else {
      this.tableStyle = 'dark';
    }
  }

  getRowClas(row) {
    const isMale = row.gender == 'male';

    if(!this.customRowClass) {
      return {};
    } 
    return {
      'male-row': isMale,
      'female-row': !isMale
    }

  }

  async openModal(row) {
    console.log(row);
    const modal = await this.modalCtrl.create({
      component: ClientsModalPage,
      componentProps: {
        row: row
      }
    });

    return await modal.present();
  }

}
