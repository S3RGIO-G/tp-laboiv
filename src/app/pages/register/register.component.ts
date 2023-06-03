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
import { Router, RouterModule, ActivatedRoute  } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { FormValidator } from 'src/app/validators/forms.validator';

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
    SpinnerComponent
  ],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  showAlert: boolean = false;
  textError?: string;
  formReg: FormGroup;

  constructor(private userService: UserService, private router: Router, private aRoute : ActivatedRoute) {
    this.formReg = new FormGroup({
      email: new FormControl('',[FormValidator.email]),
      password: new FormControl('', [FormValidator.password,Validators.minLength(8)]),
      confirmPassword: new FormControl('', [FormValidator.confirmPassword]),
      showPassword: new FormControl(),
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    this.verifyValues();
    if (this.formReg.invalid) return;
    this.loading = true;
    this.userService
      .register(this.formReg.value)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user))
        const date = new Date();
        const fullDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        this.userService.addLogAuto({ date: fullDate, user: res.user.email });
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

  verifyValues(){
    if(!this.email.value) this.email.setErrors({email: true});
    if(!this.password.value) this.password.setErrors({password: true});
  }
  
  get email (){
    return this.formReg.controls['email'];
  }
  get password (){
    return this.formReg.controls['password'];
  }
  get confirmPassword (){
    return this.formReg.controls['confirmPassword'];
  }
  get showPassword (){
    return this.formReg.controls['showPassword'];
  }
}
