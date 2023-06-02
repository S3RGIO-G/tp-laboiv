import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent {
  @Input() usuario: User | null = null;
  @Input() showButtons: boolean = false;
  @Output() loadingEvent = new EventEmitter<boolean>();
  @Output() userEvent = new EventEmitter<User | null>();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.usuario = this.userService.getCurrentUser();
  }

  loguot() {
    this.loadingEvent.emit(true);
    setTimeout(() => {
      this.userService
        .logout()
        .then((e) => {
          this.usuario = null;
          this.userEvent.emit(null);
          this.loadingEvent.emit(false);
          localStorage.clear();
          this.router.navigate(['/home']);
        })
        .catch((err) => {});
    }, 1000);
  }
}
