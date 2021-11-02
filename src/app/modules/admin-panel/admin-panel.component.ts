import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  

  isMatDrawerOpen = false;

  constructor(private _authService: AuthService, private _route: Router) {}

  ngOnInit(): void {}

  logOut() {
    localStorage.clear();
    this._route.navigate(['']);
  }

  toggleDrawer() {
    this.isMatDrawerOpen = !this.isMatDrawerOpen;
  }

}
