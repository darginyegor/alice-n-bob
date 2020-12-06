import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessengerClient } from '../interfaces/messenger-client';
import { Message } from '../interfaces/message';
import { MessagesService } from '../services/messages.service';
import { MessagesEvent } from '../interfaces/messages-event';

@Component({
  selector: 'anb-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit, OnDestroy {

  @Input() name: string;
  client: MessengerClient;
  messages: Message[] = [];
  messageDraft: string = '';

  constructor(
    private messagesService: MessagesService
  ) { }

  registerEventHandler() {
    return (event: MessagesEvent) => {
      switch (event.type) {
        case 'new': {
          this.onNewMessage(event);
          break;
        }
        case 'delete': {
          this.onMessageDelete(event);
          break;
        }
        case 'deleteFor': {
          this.onMessageDeleteFor(event);
          break;
        }
      }
    }
  }

  onNewMessage(event: MessagesEvent): void {
    this.messages.unshift(event.message);
  }

  onMessageDelete(event: MessagesEvent): void {
    let messageIndex = this.messages.findIndex(message => message.id === event.messageId);
    if (messageIndex < 0) {
      return;
    }
    this.messages.splice(messageIndex, 1);
  }

  onMessageDeleteFor(event: MessagesEvent): void {
    let message = this.messages.find(message => message.id === event.messageId);
    if (!message) {
      return;
    }
    if (!message.deletedFor.includes(event.clientId)) {
      message.deletedFor.push(event.clientId);
    }
  }

  send(): void {
    if (this.messageDraft == '') {
      return;
    }
    this.messagesService.push(this.messageDraft, this.client);
    this.messageDraft = '';
  }

  deleteMessageForAll(message: Message): void {
      this.messagesService.delete(message.id, this.client);
  }

  deleteMessageForMe(message: Message): void {
      this.messagesService.deleteFor(message.id, this.client);
  }

  ngOnInit(): void {
    this.client = this.messagesService.registerClient(this.name, this.registerEventHandler());
  }

  ngOnDestroy(): void {
    if (this.client) {
      this.client.subscription.unsubscribe();
    }
  }

}
