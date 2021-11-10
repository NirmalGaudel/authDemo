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
  user: any;
  constructor(
    private _route: Router,
    private _authService: AuthService,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.user = {
      id: Number.parseInt(localStorage.getItem('id') || ''),
      username: localStorage.getItem('username') || '',
      firstname: localStorage.getItem('firstname') || '',
      lastname: localStorage.getItem('lastname') || '',
      password: localStorage.getItem('password') || '',
    };
    if(!this.user.id) {
      localStorage.clear();
      this._route.navigate(['/auth'])
    }
  }

  logOut() {
    this._authService.logout();
  }

  get userKeys() {
    return Object.keys(this.user);
  }

  getbykey(key: string) {
    return Object.values(this.user)[Object.keys(this.user).indexOf(key)];
  }
}
