import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WordEntryPage } from '../pages';

@Component({
  templateUrl: 'build/pages/game-type/game-type.page.html',
})
export class GameTypePage {

  constructor(private nav: NavController) {

  }

  startGame(){
    this.nav.push(WordEntryPage);
  }
}