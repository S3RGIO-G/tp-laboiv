import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MayoromenorAboutComponent } from '../../components/mayoromenor-about/mayoromenor-about.component';
import { MayoromenorGameComponent } from 'src/app/components/mayoromenor-game/mayoromenor-game.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { User } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mayoromenor',
  standalone: true,
  imports: [
    CommonModule,
    MayoromenorAboutComponent,
    MayoromenorGameComponent,
    NavbarComponent,
    ChatComponent,
    SpinnerComponent,
  ],
  templateUrl: './mayoromenor.component.html',
  styleUrls: ['./mayoromenor.component.css'],
})
export class MayoromenorComponent implements OnInit {
  usuario: User | null = null;
  playGame: boolean = false;
  loading = false;
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.usuario = this.userService.getCurrentUser();
  }
}
