import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'word-history.modal.html'
})
export class WordHistoryPage {
  wordHistory: string[];

  constructor(
    private navParams: NavParams, 
    private viewController: ViewController) {
      console.log(this.navParams.data)
      this.wordHistory = this.navParams.data;
  }

  dismiss(){
    this.viewController.dismiss();
  }
} 
