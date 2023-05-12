import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from 'src/app/components/form-input/form-input.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    FormInputComponent,
    AlertComponent,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  showAlert: boolean = false;
  textError?: string;
  formReg: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.formReg = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      showPassword: new FormControl(),
    });
  }
  ngOnInit(): void {}


  onSubmit() {
    this.formReg.markAllAsTouched();
    if (this.formReg.status === 'INVALID') return;
    this.loading = true;
    this.userService
      .register(this.formReg.value)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user))
        this.formReg.reset();
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        this.showAlert = true;
        this.textError = 'Error, no se pudo registrar al usuario';
        if (err.code === 'auth/email-already-in-use')
          this.textError = 'El correo ya se encuentra en uso';
        if (err.code === 'auth/network-request-failed')
          this.textError = 'Se perdió la conexion a internet';
      })
      .finally(() => (this.loading = false));
  }

  hideAlert(value: boolean) {
    this.showAlert = value;
  }

  validatorEmail(e:any){
    
  }
  validatorPassword(e:Event){
    
  }
  validatorConfirmPassword(e:Event){
    
  }

}
