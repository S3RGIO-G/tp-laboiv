import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, ChatComponent, SpinnerComponent, RouterModule],
})
export class QuienSoyComponent implements OnInit {
  loading = false;
  usuario!: User | null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.usuario = this.userService.getCurrentUser();
  }
}
