import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userId!: number;
  userDetails: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpService,
    private _alertService: AlertService
  ) {
    this._route.paramMap.subscribe((data) => {
      const id = Number.parseInt(data.get('id') || '');
      if (!id) {
        this._alertService.alert('Invalid user');
        this._router.navigate(['/users']);
      } else this.userId = id;
    });
  }
  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo() {
    this._http
      .get('/users/' + this.userId)
      .toPromise()
      .then((data) => (this.userDetails = data))
      .catch((err) => {
        this._alertService.alert(err.error.message || 'Error Fetching User');
      });
  }
}
