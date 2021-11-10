import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleDrawer = new EventEmitter<null>();
  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  toggleMatDrawer() {
    this.toggleDrawer.emit();
  }

  logOut() {
    this._authService.logout();
  }

  avatarClicked() {
    this.router.navigate(['users/' + localStorage.getItem('id')]);
  }
}
