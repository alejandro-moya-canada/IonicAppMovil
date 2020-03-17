import { Component } from '@angular/core';
import { ConferenceData } from 'src/app/providers/conference-data';

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.page.html',
  styleUrls: ['./speaker-list.page.scss'],
})
export class SpeakerListPage {
  speakers: any[] = [];

  constructor(public confData: ConferenceData) { }

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  }
  

}
