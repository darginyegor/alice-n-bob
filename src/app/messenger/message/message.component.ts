import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'anb-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;

  constructor() { }

  ngOnInit(): void {
  }

}
