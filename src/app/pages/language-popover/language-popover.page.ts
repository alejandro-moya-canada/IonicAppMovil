import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-language-popover',
  templateUrl: './language-popover.page.html',
  styleUrls: ['./language-popover.page.scss'],
})
export class LanguagePopoverPage implements OnInit {

  languages = [];
  selected = "";

  constructor(private popoverCtrl: PopoverController, private lenguageService: LanguageService) { }

  ngOnInit() {
    this.languages = this.lenguageService.getLanguages();
    this.selected = this.lenguageService.selected;
  }

  select(lng) {
    this.lenguageService.setLanguage(lng);
    this.popoverCtrl.dismiss();
  }

}
