import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    SpinnerComponent,
    ChatComponent,
  ],
})
export class HomeComponent implements OnInit {
  usuario: User | null = null;
  loading: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.usuario = this.userService.getCurrentUser();
  }
}
