import { Component, OnInit } from '@angular/core';
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
  dataSource = [];
  constructor(private _http: HttpService) {}

  ngOnInit(): void {
    this._http
      .get('/users')
      .toPromise()
      .then((data: any) => {
        if (data.count) {
          this.dataSource = data.rows;
        }
      })
      .catch((err) => console.error(err));
  }
}
