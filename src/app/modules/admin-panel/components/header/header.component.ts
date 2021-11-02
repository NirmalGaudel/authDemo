import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleDrawer = new EventEmitter<null>();
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  toggleMatDrawer() {
    this.toggleDrawer.emit();
  }

  logOut() {
    this._authService.logout();
  }
}
