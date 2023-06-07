import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';
import { Message } from 'src/app/classes/message';
import { TimeChatPipe } from 'src/app/pipes/time-chat.pipe';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [CommonModule, TimeChatPipe],
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
})
export class ChatMessagesComponent implements OnInit {
  @Input() messages: Array<Message> = [];
  @Input() user!: User;
  constructor() {}
  ngOnInit(): void {}
}
