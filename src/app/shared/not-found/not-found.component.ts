import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  url = '';
  constructor(private _router: Router) {}
  ngOnInit(): void {
    this.url = this._router.routerState.snapshot.url;
  }

  
}
