import { Injectable } from '@angular/core';
import * as _ from 'lodash';
let data = <DataItem[]>require('../data/star-wars-data');


@Injectable()
export class GameService {
    //private gameEntries: { inputTerm: string, entry: DataItem }[] = [];
    private gameEntries: GameEntry[] = [];
    private players: { name: string }[] = [];
    private playerIndex = 0;

    constructor() { }


    getFullDataBank() {
        return data;
    }

    getTurnData() {
        return {
            wordCount: this.gameEntries.length,
            lastEntry: _.last(this.gameEntries),
            currentPlayer: (this.players.length === 0 ? '' : this.players[this.playerIndex].name)
        };
    }

    getWordHistory() {
        return this.gameEntries;
    }

    checkWord(input: string) {
        let wordToCheck = input.toLowerCase();
        let result = _.find(data, x => {
            let titleToCheck = x.title.toLowerCase();
            // First check for exact match
            if (titleToCheck === wordToCheck) {
                return true;
            }

            // Exact match not found so check word parts
            let terms = x.title.toLowerCase().split(' ');
            return _.includes(terms, wordToCheck);
        });
        //console.log('**result', result);
        return result;
    }

    isValidWord(wordInput: string): ValidationInfo {
        // Check that word was supplied
        if (!wordInput) {
            return {
                title: 'Missing Entry',
                subTitle: 'You did not enter a word!',
                valid: false
            };
        }

        // Check if first character is correct
        let turnData = this.getTurnData();
        if (turnData.lastEntry) {
            let lastLetterLastTurn = _.last(turnData.lastEntry.inputTerm).toUpperCase();
            let firstLetterThisTurn = _.first(wordInput).toUpperCase();
            if (lastLetterLastTurn !== firstLetterThisTurn) {
                return {
                    title: 'Invalid First Letter',
                    subTitle: `Your first letter must be: ${lastLetterLastTurn}!`,
                    valid: false
                }
            }
        }

        // Check if term has already been used 
        let wordHistory = this.getWordHistory();
        let lowerInput = wordInput.toLowerCase();
        let previouslyUsed = _.find(wordHistory, x => x.entry.title.toLowerCase() === lowerInput);
        //console.log('**previously used', previouslyUsed);
        if (previouslyUsed) {
            return {
                title: 'Previously Used',
                subTitle: `This was already used: ${wordInput}. Please try again!`,
                valid: false
            };
        }

        return { valid: true };
    }

    nextTurn(successfulTerm: string, entry: DataItem, player?: string) {
        console.log('player',player )
        this.gameEntries.push({ inputTerm: successfulTerm, entry: entry, player: player });
        console.log('**game words', this.gameEntries);
        this.playerIndex += 1;
        if (this.playerIndex === this.players.length) {
            this.playerIndex = 0; 
        }
        return this.getTurnData();
    }

    resetGame() {
        this.gameEntries = [];
        this.players  = [];
    }

    setPlayersList(players) {
        this.players = players;
    }

}

interface DataItem {
    title: string,
    desc: string
}

interface GameEntry {
    inputTerm: string,
    entry: DataItem,
    player: string
}

interface ValidationInfo {
    title?: string,
    subTitle?: string,
    valid: boolean
}