import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { FormInputComponent } from 'src/app/components/form-input/form-input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ModalUsersComponent } from 'src/app/components/modal-users/modal-users.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormInputComponent,
    AlertComponent,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ModalUsersComponent,
    SpinnerComponent,
  ],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  showAlert: boolean = false;
  showUsersModal: boolean = false;
  formLog: FormGroup;
  textError?: string;

  constructor(private userService: UserService, private router: Router) {
    this.formLog = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      showPassword: new FormControl(),
    });
  }
  ngOnInit(): void {}

  hideAlert(value: boolean) {
    this.showAlert = value;
  }

  onSubmit() {
    this.loading = true;
    this.showAlert = false;
    this.userService
      .login(this.formLog.value)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        const date = new Date();
        const fullDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        this.userService.addLogAuto({ date: fullDate, user: res.user.email });
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        this.loading = false;
        this.showAlert = true;

        switch (err.code) {
          case 'auth/missing-email':
            this.textError = 'Por favor ingrese un correo electronico';
            break;
          case 'auth/missing-password':
            this.textError = 'Por favor ingrese una contraseña';
            break;
          case 'auth/invalid-email':
            this.textError = 'El correo no es valido';
            break;
          case 'auth/auth/user-not-found':
            this.textError = 'El usuario no esta registrado';
            break;
          case 'auth/wrong-password':
            this.textError = 'La contraseña no es correcta';
            break;
          case 'auth/network-request-failed':
            this.textError = 'Se perdió la conexion a internet';
            break;
          default:
            this.textError = 'Error, algo salio mal';
        }
      });
  }
  userSelected(event: any) {
    this.password.setValue(event.password);
    this.email.setValue(event.email);
  }

  get showPassword() {
    return this.formLog.controls['showPassword'];
  }
  get password() {
    return this.formLog.controls['password'];
  }
  get email() {
    return this.formLog.controls['email'];
  }
}
