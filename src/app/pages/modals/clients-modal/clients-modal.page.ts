import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-clients-modal',
  templateUrl: './clients-modal.page.html',
  styleUrls: ['./clients-modal.page.scss'],
})
export class ClientsModalPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

}
