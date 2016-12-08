import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import * as _ from 'lodash';

import { EntryDetailPage } from '../pages';
import { GameService } from '../../services/services';

@Component({
  templateUrl: 'browse-data.page.html',
})
export class BrowseDataPage {
  data: any[];
  entries: any[];
  queryText: string = '';

  constructor(
    private modalController: ModalController,
    private nav: NavController, 
    private gameService: GameService) { }

  ionViewDidLoad(){
    this.data = this.gameService.getFullDataBank();
    this.entries = this.data;
  }

  getHeader(record, recordIndex, records){
    let firstCharacter = record.title[0].toUpperCase();
    if (recordIndex === 0 || firstCharacter !== records[recordIndex-1].title[0].toUpperCase()){
      return firstCharacter;
    }
    return null;
  }

  viewDetail(entry){
    let modal = this.modalController.create(EntryDetailPage, entry);
    modal.present();
  }

  updateEntries(){
    if (this.queryText.length >= 2) {
      let queryTextLower = this.queryText.toLowerCase();
      this.entries = _.filter(this.data, x => x.title.toLowerCase().includes(queryTextLower));
    }
  } 
}
