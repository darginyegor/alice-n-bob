import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessengerComponent } from './messenger/messenger.component';
import { MessageComponent } from './messenger/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    MessengerComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
