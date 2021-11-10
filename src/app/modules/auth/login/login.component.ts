import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { InvalidErrorStateMatcher } from '../errorStateMatcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup = new FormGroup({});

  matcher = new InvalidErrorStateMatcher();
  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _route: Router,
    private _alertService:AlertService,
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this._fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitForm() {
    if (this.loginFormGroup.invalid) return;
    const { username, password } = this.loginFormGroup.value;
    this._authService
      .login(username, password)
      .then((user) => {
        this._route.navigate(['']);
      })
      .catch((e) => {
        console.log(e)
        this._alertService.alert('Invalid Username or Password',"Retry");
      });
  }

  get username() {
    return this.loginFormGroup.controls.username;
  }
}
