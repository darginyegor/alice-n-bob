import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../interfaces/message';
import { MessagesEvent } from '../interfaces/messages-event';
import { MessengerClient } from '../interfaces/messenger-client';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages: Message[] = [];
  private clients: MessengerClient[] = [];
  private clientIdTracker: number = 1;
  private messageIdTracker: number = 1;
  private messageEmiiter: Subject<MessagesEvent> = new Subject();


  constructor() { }

  private getNewClientId() {
    return this.clientIdTracker++;
  }

  private getNewMessageId() {
    return this.messageIdTracker++;
  }

  public registerClient(name: string, handler: (message: MessagesEvent) => any): MessengerClient {
    let subscription = this.messageEmiiter.subscribe(handler);
    let newClient: MessengerClient = {
      id: this.getNewClientId(),
      name,
      subscription
    };
    this.clients.push(newClient);
    return newClient;
  }

  public push(messageBody: string, client: MessengerClient): void {
    if (!this.clients.includes(client)) {
      throw new Error('Client not registered.');
    }
    let message: Message = {
      id: this.getNewMessageId(),
      senderId: client.id,
      body: messageBody,
      createdAt: new Date(),
      deletedFor: []
    }
    this.messages.push(message);
    this.messageEmiiter.next({
      type: 'new',
      message
    });
  }

  public delete(messageId: number, client: MessengerClient): void {
    if (!this.clients.includes(client)) {
      throw new Error('Client not registered.');
    }
    let messageIndex = this.messages.findIndex(message => message.id === messageId);
    if (messageIndex < 0) {
      throw new Error('Message not found');
    }
    this.messages.splice(messageIndex, 1);
    this.messageEmiiter.next({
      type: 'delete',
      messageId
    });
  }

  public deleteFor(messageId: number, client: MessengerClient) {
    if (!this.clients.includes(client)) {
      throw new Error('Client not registered.');
    }
    let message = this.messages.find(message => message.id === messageId);
    if (!message) {
      throw new Error('Message not found');
    }
    message.deletedFor.push(client.id);
    this.messageEmiiter.next({
      type: 'deleteFor',
      messageId: message.id,
      clientId: client.id
    });
  }

}
