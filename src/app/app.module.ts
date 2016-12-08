import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowseDataPage, EntryDetailPage, HomePage, PlayerEntryPage, WordEntryPage, WordHistoryPage } from '../pages/pages';
import { GameService } from '../services/services';

@NgModule({
  declarations: [
    MyApp,
    BrowseDataPage,
    EntryDetailPage,
    HomePage,
    PlayerEntryPage,
    WordEntryPage,
    WordHistoryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BrowseDataPage,
    EntryDetailPage,
    HomePage,
    PlayerEntryPage,
    WordEntryPage,
    WordHistoryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, GameService]
})
export class AppModule {}
