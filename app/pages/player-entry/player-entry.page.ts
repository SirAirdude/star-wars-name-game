import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WordEntryPage } from '../pages';
import * as _ from 'lodash';

@Component({
    templateUrl: 'build/pages/player-entry/player-entry.page.html'
})
export class PlayerEntryPage {
    //players = ['steve', 'justin', 'mom' ];
    players = [{ name: ''}];


    constructor(public nav: NavController) {

    }

    startMultiPlayerPassAndPlayGame() {
        this.nav.push(WordEntryPage)

    }
    addPlayer(){
        console.log('add player', this.players); 
        this.players.push({ name: ''});
    }

    removePlayer(player){
        _.remove(this.players, player);
    }

}
