import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'username',
    'firstname',
    'lastname',
    'actions',
  ];
  dataSource: any[] = [];
  constructor(
    private _http: HttpService,
    private _router: Router,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._http
      .get('/users')
      .toPromise()
      .then((data: any) => {
        if (data.count) {
          this.dataSource = data.rows;
        }
      })
      .catch((err) => {
        this._alertService.alert(
          err.error?.message || err.message || 'Error while fetching'
        );
        if (err.status === 401) {
          localStorage.clear();
          this._router.navigate(['']);
        }
      });
  }

  viewUser(id: any) {
    console.log('View', id);
    this._router.navigate(['/users/' + id]);
  }

  editUser(id: number) {
    console.log('EDIT', id);
  }

  deleteUser(id: number) {
    let ref = this._alertService.confirm(
      `Delete User with id : ${id} ?`,
      'Yes',
      'No'
    );
    ref
      .afterClosed()
      .toPromise()
      .then((d) => {
        if (!d) return;
        return this._http
          .delete(`/users/${id}`)
          .toPromise()
          .then((data) => {
            this._alertService.alert('User Deleted', 'okay');
            this.getUsers();
          })
          .catch((err) => this._alertService.alert(err.error.message));
      });
  }
}
