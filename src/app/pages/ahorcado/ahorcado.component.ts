import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { AhorcadoAboutComponent } from '../../components/ahorcado-about/ahorcado-about.component';
import { AhorcadoGameComponent } from 'src/app/components/ahorcado-game/ahorcado-game.component';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SpinnerComponent,
    AhorcadoAboutComponent,
    AhorcadoGameComponent,
    ChatComponent,
  ],
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css'],
})
export class AhorcadoComponent implements OnInit{
  usuario: User | null = null;
  playGame: boolean = false;
  loading = false;

  constructor(private userService : UserService) {}

  ngOnInit() {
    this.usuario = this.userService.getCurrentUser();
  }
}
