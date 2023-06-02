import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { Message } from 'src/app/classes/message';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
})
export class ChatMessagesComponent implements OnInit {
  @Input() messages: Array<Message> = [];
  @Input() user !: User;
  constructor(private chatService: ChatService, private userService : UserService) {
    
  }
  ngOnInit(): void {
  }


}
