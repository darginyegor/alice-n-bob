import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessengerClient } from '../interfaces/messenger-client';
import { Message } from '../interfaces/message';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'anb-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit, OnDestroy {

  @Input() name: string;
  client: MessengerClient;
  messages: Message[] = [];
  messageDraft: string;

  constructor(
    private messagesService: MessagesService
  ) { }

  registerMessageHandler() {
    return (message: Message) => {
      this.messages.unshift(message);
    }
  }

  send() {
    this.messagesService.push(this.messageDraft, this.client);
    this.messageDraft = '';
  }

  ngOnInit(): void {
    this.client = this.messagesService.registerClient(this.name, this.registerMessageHandler());
  }

  ngOnDestroy(): void {
    if (this.client) {
      this.client.subscription.unsubscribe();
    }
  }

}
