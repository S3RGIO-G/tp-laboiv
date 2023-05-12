import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HomeComponent implements OnInit {
  usuario : User | null = null;

  constructor(private userService: UserService, private router: Router) {
  }
  
  ngOnInit() {
    this.cargarUsuario();

  }

  loguot() {
    this.userService
      .logout()
      .then((e) => {
        this.usuario = null;
        localStorage.clear();
      })
      .catch((err) => {});
  }

  cargarUsuario(){
    let user = localStorage.getItem('user');
    if(user !== null){
      this.usuario = JSON.parse(user);
    }
  }
}
