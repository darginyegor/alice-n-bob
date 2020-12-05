import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'anb-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;
  @HostBinding('class.anb-message--outgoing') @Input() isOutgoing: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
