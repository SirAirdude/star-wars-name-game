import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayerEntryPage, WordEntryPage } from '../pages';
import { GameService } from '../../services/services';

@Component({
  templateUrl: 'build/pages/game-type/game-type.page.html',
})
export class GameTypePage {

  constructor(private nav: NavController, private gameService: GameService) {

  }

  startGame(){
    this.gameService.resetGame();
    this.nav.push(WordEntryPage); 
  }

  startPassAndPlayGame(){
    this.gameService.resetGame();
    this.nav.push(PlayerEntryPage); 
  }

}


