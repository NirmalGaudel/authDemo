import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../modules/auth/user';
import { AlertService } from './alert.service';
import { HttpService } from './http.service';

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
  constructor(
    private _router: Router,
    private _alertService: AlertService,
    private _http: HttpService
  ) {}

  checkUsername(username: string) {
    //demo for backend
    // TODO : Call Backend and return httpResponse
    const matches = users.filter((user) => user.username !== username);
    return !!matches.length;
  }

  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this._http
        .post('/auth/login', { username, password })
        .toPromise()
        .then((res: any) => {
          localStorage.clear();
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', res.user.id);
          localStorage.setItem('username', res.user.username);
          localStorage.setItem('fullname', res.user.fullname);
          localStorage.setItem('email', res.user.email);
          localStorage.setItem('role', res.user.role);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  logout() {
    let ref = this._alertService.confirm('Are you sure ?', 'LogOut', 'No');
    ref
      .afterClosed()
      .toPromise()
      .then((d) => {
        if (d) {
          localStorage.clear();
          this._router.navigate(['auth']);
        }
      });
  }

  signup(payload: any) {
    return new Promise((resolve, reject) => {
      const { username, fullname, email, password } = payload;
      const body = { username, fullname, email, password };
      this._http
        .post('/auth/signup', body)
        .toPromise()
        .then((res: any) => {
          localStorage.clear();
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', res.user.id);
          localStorage.setItem('username', res.user.username);
          localStorage.setItem('fullname', res.user.fullname);
          localStorage.setItem('email', res.user.email);
          localStorage.setItem('role', res.user.role);
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err.error);
        });
    });
  }
}
