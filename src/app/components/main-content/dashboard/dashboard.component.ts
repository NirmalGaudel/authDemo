import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user = {
    id: Number.parseInt(localStorage.getItem('id') || '') || -1,
    username: localStorage.getItem('username') || '',
    firstname: localStorage.getItem('firstname') || '',
    lastname: localStorage.getItem('lastname') || '',
    password: localStorage.getItem('password') || '',
  };
  constructor(
    private _route: Router,
    private _authService: AuthService,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {}

  logOut() {
    if (this._authService.logout()) this._route.navigate(['auth']);
    else {
      this._alertService.alert('Logout not successful');
    }
  }

  get userKeys() {
    return Object.keys(this.user);
  }

  getbykey(key: string) {
    return Object.values(this.user)[Object.keys(this.user).indexOf(key)];
  }

  
}
