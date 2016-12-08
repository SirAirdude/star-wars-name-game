import { Component } from '@angular/core';
import { ActionSheetController, NavController } from 'ionic-angular';
import { BrowseDataPage, PlayerEntryPage, WordEntryPage } from '../pages';
import { GameService } from '../../services/services';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public gameService: GameService,
    public nav: NavController) {

  }

  browseDataBank() {
    this.nav.push(BrowseDataPage);
  }

  goToPlayNow() {
    // Other future options: 1) multi-player remote, 2) vs CPU
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Game Type',
      buttons: [
        {
          text: 'Multi-Player Pass and Play',
          handler: () => {
            this.gameService.resetGame();
            this.nav.push(PlayerEntryPage);
          }
        },
        {
          text: 'Single Player',
          handler: () => {

            this.gameService.resetGame();
            this.nav.push(WordEntryPage);
          }
        }
      ]
    });
    actionSheet.present();
  }
}
