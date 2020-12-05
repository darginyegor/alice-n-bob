import { Component, Input, OnInit } from '@angular/core';
import { MessengerClient } from '../interfaces/messenger-client';
import { Message } from '../interfaces/message';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'anb-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  @Input() name: string;
  client: MessengerClient;
  messages: Message[] = [];

  constructor(
    private messagesService: MessagesService
  ) { }

  onMessageRecieved(message: Message) {

  }

  ngOnInit(): void {
    this.client = this.messagesService.registerClient(this.name, this.onMessageRecieved);
  }

}
