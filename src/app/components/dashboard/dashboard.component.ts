import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private _route: Router, private _authService: AuthService) {}

  ngOnInit(): void {}

  logOut() {
    if(this._authService.logout())  this._route.navigate(["auth"]);
    else{
      alert("Logout not successful");
    }
  }

  get userKeys() {
    return Object.keys(this.user);
  }

  getbykey(key: string) {
    return Object.values(this.user)[Object.keys(this.user).indexOf(key)];
  }
}
