import { Component, OnInit } from '@angular/core';
import { AuthService } from '@frontegg/ng-auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user = null;
  JSON = JSON;

  constructor(public authService: AuthService) {
    // authService.isAuthenticated
  }

  logout(): void {
    this.authService.actions.logout(() => {
      window.location.href = '/account/logout';
    });
  }

  ngOnInit(): void {}
}
