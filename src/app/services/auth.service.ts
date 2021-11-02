import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../modules/auth/user';
import { AlertService } from './alert.service';

const users: User[] = [
  {
    id: 1,
    username: 'nirmal',
    firstname: 'Nil Kantha',
    lastname: 'Gaudel',
    password: 'password',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _router: Router, private _alertService: AlertService) {}

  checkUsername(username: string) {
    //demo for backend
    // TODO : Call Backend and return httpResponse
    const matches = users.filter((user) => user.username !== username);
    return !!matches.length;
  }

  login(username: string, password: string) {
    // TODO : return HttpResponse
    return new Promise((resolve, reject) => {
      const matches = users.filter(
        (user) => user.username === username && user.password === password
      );
      if (!matches.length) return reject();
      const user = matches[0];
      localStorage.clear();
      localStorage.setItem('id', user.id + '');
      localStorage.setItem('firstname', user.firstname + '');
      localStorage.setItem('lastname', user.lastname + '');
      localStorage.setItem('username', user.username + '');
      localStorage.setItem('password', user.password + '');
      return resolve(user);
    });
  }

  logout() {
    this._alertService.alert("logout");
    // localStorage.clear();
    // this._router.navigate(['auth']);
  }
}
