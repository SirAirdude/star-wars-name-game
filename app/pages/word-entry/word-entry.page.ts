import { Component } from '@angular/core';
import { AlertController, ModalController, NavController, ToastController } from 'ionic-angular';
import { Vibration } from 'ionic-native';
import * as _ from 'lodash';

import { GameService } from '../../services/services';
import { HomePage, WordHistoryPage } from '../pages';

@Component({
  templateUrl: 'build/pages/word-entry/word-entry.page.html',
})
export class WordEntryPage {
  private turnData: any = {};
  wordInput: string;

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private nav: NavController, 
    private toastController: ToastController,
    private gameService: GameService) {
    this.turnData = this.gameService.getTurnData();
  }

  goHome(){
    let confirm = this.alertController.create({
      title: 'Are you sure?',
      message: 'Are you sure you want to quit game and go Home?',
      buttons: [
        {
          text: 'Yes',
          handler: () => confirm.dismiss().then(() => {
            this.gameService.resetGame();
            this.nav.popToRoot();
          })
        },
        {
          text: 'No' 
        }
      ]
    });
    confirm.present();
  }
  
  checkWordHistory(){
    let modal = this.modalController.create(WordHistoryPage, this.gameService.getWordHistory()); 
    modal.present();
  }

  submitWord(){
    let validationResult = this.gameService.isValidWord(this.wordInput);
    if (!validationResult.valid){
      Vibration.vibrate([100, 50, 100, 50, 100]);
      let toast = this.toastController.create({
        message: `${validationResult.title} - ${validationResult.subTitle}`,
        duration: 2000,
        showCloseButton: true
      });
      toast.present();
      return;
    }

    let result = this.gameService.checkWord(this.wordInput);
    if (result){
      let alert = this.alertController.create({
        title: 'Correct',
        subTitle: `"${this.wordInput}" was found for "${result.title}"!"`,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.turnData = this.gameService.nextTurn(this.wordInput, result);
              console.log('**just assgined turnData', this.turnData);
              this.wordInput = '';
            }
          }
        ]
      });
      alert.present();
    } else {
      let alert = this.alertController.create({
        title: 'Not Found',
        subTitle: `"${this.wordInput}" was not found!"`,
        buttons: ['OK']
      });
      alert.present();
    }
  }

  // isValid(){
  //   let isValid = true;

  //   if (!this.wordInput){
  //     let alert = this.alertController.create({
  //       title: 'Missing Entry',
  //       subTitle: 'You did not specifiy a word!',
  //       buttons: ['OK']
  //     });
  //     alert.present();
  //     isValid = false;
  //     return false;
  //   }

  //   // Check if first character is correct
  //   if (this.turnData.lastWord) { 
  //     let lastLetterLastTurn = _.last(<string>this.turnData.lastWord).toUpperCase();
  //     let firstLetterThisTurn = _.first(this.wordInput).toUpperCase();
  //     if (lastLetterLastTurn !== firstLetterThisTurn) {
  //       let alert = this.alertController.create({
  //         title: 'Invalid First Letter',
  //         subTitle: `Your first letter must be: ${lastLetterLastTurn}!`,
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //       isValid = false;
  //       return false;
  //     }
  //   }

  //   // Check if term has already been used
  //   let wordHistory = this.gameService.getWordHistory();
  //   let lowerInput = this.wordInput.toLowerCase();
  //   let previouslyUsed = _.find(wordHistory, x => x.inputTerm.toLowerCase() === lowerInput);
  //   console.log('**previously used', previouslyUsed);
  //   if (previouslyUsed) {
  //     let alert = this.alertController.create({
  //         title: 'Previously Used',
  //         subTitle: `This was already used: ${this.wordInput}. Please try again!`,
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //     isValid = false;
  //     return false;
  //   }
  //   return true;
  // }
}
