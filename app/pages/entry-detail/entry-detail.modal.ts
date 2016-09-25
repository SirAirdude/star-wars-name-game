import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/entry-detail/entry-detail.modal.html',
})
export class EntryDetailPage {
  entry: any;
  showImage = false;

  constructor(
    private navParams: NavParams,
    private viewController: ViewController) {
    this.entry = this.navParams.data;
  }

  dismiss(){
    this.viewController.dismiss();
  }
}
