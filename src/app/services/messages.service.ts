import { EventEmitter, Injectable } from '@angular/core';
import { Message } from '../interfaces/message';
import { MessengerClient } from '../interfaces/messenger-client';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages: Message[] = [];
  private clients: MessengerClient[] = [];
  private clientIdTracker: number = 1;
  private messageIdTracker: number = 1;
  private messageEmiiter: EventEmitter<Message> = new EventEmitter();


  constructor() { }

  private getNewClientId() {
    return this.clientIdTracker++;
  }

  private getNewMessageId() {
    return this.messageIdTracker++;
  }

  public registerClient(name: string, handler: (message) => void): MessengerClient {
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
      createdAt: new Date()
    }
    this.messages.push(message);
    this.messageEmiiter.emit(message);
  }

}
