import { Component, OnInit } from '@angular/core';
import { InvalidErrorStateMatcher } from '../errorStateMatcher';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  matcher = new InvalidErrorStateMatcher();
  signupFormGroup: FormGroup = new FormGroup({});
  constructor(
    private _fb: FormBuilder,
    private _route: Router,
    private _alertService: AlertService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupFormGroup = this._fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}'),
      ]),
    });
  }

  onSubmit() {
    if (this.signupFormGroup.invalid) return;
    console.log(this.signupFormGroup.value);
    this._authService
      .signup(this.signupFormGroup.value)
      .then((_) => {
        this._alertService.alert('Account Created Successfully', 'okay');
        this._route.navigate(['']);
      })
      .catch((err) => {
        if (err?.errors) {
          const messages: string[] = [];
          Object.values(err.errors).forEach((e: any) =>
            messages.push(e.msg || '')
          );
          this._alertService.alert(messages);
        } else
          this._alertService.alert(err?.message || JSON.stringify(err), 'Okay');
      });
  }
}
