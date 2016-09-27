import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WordEntryPage } from '../pages';
import * as _ from 'lodash';
import { GameService } from '../../services/services';

@Component({
    templateUrl: 'build/pages/player-entry/player-entry.page.html'
})
export class PlayerEntryPage {
    //players = ['steve', 'justin', 'mom' ];
    players = [{ name: '' }];


    constructor(public nav: NavController, private gameService: GameService) {

    }

    startMultiPlayerPassAndPlayGame() {
        this.gameService.setPlayersList(this.players);
        console.log(this.players);
        this.nav.push(WordEntryPage);

    }

    addPlayer() {
        console.log('add player', this.players);
        this.players.push({ name: '' });
    }

    removePlayer(player) {
        _.remove(this.players, player);
    }

}
