import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {
  usuario!: User | null;

  constructor(private userService: UserService, private router: Router) {
  }
  
  ngOnInit() {
    this.cargarUsuario();
  }

  loguot() {
    this.userService
      .logout()
      .then((e) => {
        console.log('logout exitoso');
      })
      .catch((err) => {});
  }

  cargarUsuario(){
    this.usuario = this.userService.getCurrentUser();
  }
}
