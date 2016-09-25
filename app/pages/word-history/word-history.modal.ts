import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/word-history/word-history.modal.html'
})
export class WordHistoryPage {
  wordHistory: string[];

  constructor(
    private navParams: NavParams, 
    private viewController: ViewController) {
      this.wordHistory = this.navParams.data;
  }

  dismiss(){
    this.viewController.dismiss();
  }
} 
