import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PreguntadosAboutComponent } from 'src/app/components/preguntados-about/preguntados-about.component';
import { PreguntadosGameComponent } from 'src/app/components/preguntados-game/preguntados-game.component';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    PreguntadosAboutComponent,
    PreguntadosGameComponent,
    ChatComponent,
    SpinnerComponent,
  ],
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css'],
})
export class PreguntadosComponent implements OnInit {
  usuario: User | null = null;
  playGame: boolean = false;
  loading = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.usuario = this.userService.getCurrentUser();
  }
}
