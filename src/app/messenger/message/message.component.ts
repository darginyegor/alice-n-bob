import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'anb-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;
  @HostBinding('class.anb-message--outgoing') @Input() isOutgoing: boolean = false;
  @Output() onDeleteForAll: EventEmitter<Message> = new EventEmitter();
  @Output() onDeleteForMe: EventEmitter<Message> = new EventEmitter();

  constructor() { }

  deleteForAll(): void {
    this.onDeleteForAll.emit(this.message);
  }

  deleteForMe(): void {
    this.onDeleteForMe.emit(this.message);
  }

  ngOnInit(): void {
  }

}
