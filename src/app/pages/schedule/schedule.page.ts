import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, AlertController, LoadingController, ModalController, IonRouterOutlet, ToastController, Config, PopoverController } from '@ionic/angular';
import { ConferenceData } from 'src/app/providers/conference-data';
import { Router } from '@angular/router';
import { UserData } from 'src/app/providers/user-data';
import { ScheduleFilterPage } from '../modals/schedule-filter/schedule-filter.page';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  // referencia del elemento en la lista
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  querytext = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.updateSchedule();

    this.ios = this.config.get('mode') === 'ios';
  }

  updateSchedule() {
    // cerrar los elementos cuando Schedule se esta actualizando
    if(this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    // devolver linea de tiempo
    this.confData.getTimeline(this.dayIndex, this.querytext, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  async presentFilter() {
    // creacion de ventana modal
    const modal = await this.modalCtrl.create({
      component: ScheduleFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { excludedTracks: this.excludeTracks }
    });
    // presentacion de modal
    await modal.present();

    // datos guardados una vez cerrada la modal
    const { data } = await modal.onWillDismiss();
    if(data) {
      this.excludeTracks = data;
      // llamo a actualizar Schedule
      this.updateSchedule();
    }
  }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    if(this.user.hasFavorite(sessionData.name)) {
      // elimino el favorito
      this.removeFavorite(slidingItem, sessionData, 'Ya existe como favorito');
    } else {
      // añado a favoritos
      this.user.addFavorite(sessionData.name);
      // cierro los elementos abiertos
      slidingItem.close();

      // creo un toast
      const toast = await this.toastCtrl.create({
        header: `${sessionData.name} se añadió correctamente a favoritos`,
        duration: 3000,
        buttons: [{
          text: 'Cerrar',
          role: 'cancel'
        }]
      });

      // presento el toast
      await toast.present();
    }
  }

  async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
    // creacion de alert
    const alert = await this.alertCtrl.create({
      header: title,
      message: '¿Desea eliminar la sesión de sus favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            // cierro los elementos pero no elimina
            slidingItem.close();
          }
        },
        {
          text: 'Borrar',
          handler: () => {
            // elimino los favoritos
            this.user.removeFavorite(sessionData.name);
            // actualizo el Schedule
            this.updateSchedule();
            // cierro los elementos
            slidingItem.close();
          }
        }
      ]
    });
    // presento el alert
    await alert.present();
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    // creacion de loading
    const loading = await this.loadingCtrl.create({
      message: `Enviando a ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    // presento el loading
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }

}
