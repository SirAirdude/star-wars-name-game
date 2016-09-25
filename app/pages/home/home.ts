import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BrowseDataPage, GameTypePage } from '../pages';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(public nav: NavController) {

  }

  browseDataBank(){
    this.nav.push(BrowseDataPage);
  }
  
  goToPlayNow(){
    this.nav.push(GameTypePage);
  }
}
