import { Component } from '@angular/core';
import { ConferenceData } from 'src/app/providers/conference-data';
import { Config, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-schedule-filter',
  templateUrl: './schedule-filter.page.html',
  styleUrls: ['./schedule-filter.page.scss'],
})
export class ScheduleFilterPage{

  ios: boolean;

  tracks: {name: string, icon: string, isChecked: boolean}[] = [];

  constructor(
    public configData: ConferenceData,
    private config: Config,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) { }

  ionViewWillEnter() {
    this.ios = this.config.get('mode') === `ios`;

    const excludedTrackNames = this.navParams.get('excludedTracks');
    console.log(excludedTrackNames);

    this.configData.getTracks().subscribe((tracks: any[]) => {
      tracks.forEach(track => {
        this.tracks.push({
          name: track.name,
          icon: track.icon,
          isChecked: (excludedTrackNames.indexOf(track.name) === -1)
        });
      });
    });
  }

  selectAll(check: boolean) {
    // seleccionar o deseleccionar todos
    this.tracks.forEach(track => {
      track.isChecked = check;
    })
  }

  applyFilters() {
    const excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

}
