import { Component } from '@angular/core';
import { ConferenceData } from 'src/app/providers/conference-data';
import { PopoverController } from '@ionic/angular';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.page.html',
  styleUrls: ['./speaker-list.page.scss'],
})
export class SpeakerListPage {
  speakers: any[] = [];

  constructor(public confData: ConferenceData, private popoverCtrl: PopoverController) { }

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  }

  async openLanguagePopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev
    });
    await popover.present();
  }
  

}
