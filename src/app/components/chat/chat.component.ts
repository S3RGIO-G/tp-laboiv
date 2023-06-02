import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from 'src/app/classes/message';
import { User } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormInputComponent,
    ChatMessagesComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  
  showChat = false;
  formChat!: FormGroup;
  messages: Array<Message> = [];
  @Input() user !: User | null;
  @ViewChild('messagesBox') messagesBox!: ElementRef;

  constructor(
    private chatService: ChatService
  ) {
    this.formChat = new FormGroup({
      message: new FormControl(null, [Validators.maxLength(20)]),
    });
  }

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((res) => {
      res.sort((a, b) => {
        let fecha1 = new Date(a.fullDate);
        let fecha2 = new Date(b.fullDate);

        if (fecha1 === fecha2) return 0;
        return fecha1 > fecha2 ? 1 : -1;
      });

      this.messages = res;

      this.scrollChat()
    });
  }

  showChatFunc() {
    this.showChat = true;
    this.scrollChat();
  }

  scrollChat(){
    setTimeout(() => {
      if (!this.messagesBox) return;
      const div = this.messagesBox.nativeElement;
      div.scrollTop = div.scrollHeight;
    }, 10);
  }

  onSubmit() {
    if (!this.message.value) this.message.setErrors({ invalid: true });
    if (this.formChat.invalid) return;

    let date = new Date();
    let hour = date.toLocaleTimeString();
    let dayAndMonth = date
      .toLocaleDateString()
      .split('/')
      .slice(0, 2)
      .join('/');
    let fullDate = `${date
      .toLocaleDateString()
      .split('/')
      .reverse()
      .join('-')} ${hour}`;

    let message = {
      message: this.message.value,
      user: this.user?.email || '',
      fullDate: fullDate,
      date: dayAndMonth,
      hour: hour,
    };
    this.chatService.addMessage(message);
    this.formChat.reset();
  }

  get message() {
    return this.formChat.controls['message'];
  }
}
