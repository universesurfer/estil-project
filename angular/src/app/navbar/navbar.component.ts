import { Component, OnInit} from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [SessionService]
})
export class NavbarComponent implements OnInit {
  isAuth: boolean;

  constructor(
  	private session: SessionService,
  	private router:  Router
  ) {
    this.session.isAuth
        .subscribe((isAuth: boolean) => {
          console.log("in navbar", isAuth);
        // user will be false if logged out
        // or user object if logged in.
          this.isAuth = isAuth;
        });
    if (this.session.token) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  ngOnInit() {
    this.session.isAuth
        .subscribe((isAuth: boolean) => {
        // user will be false if logged out
        // or user object if logged in.
          this.isAuth = isAuth;
        });
  }

  logout() {
  	this.session.logout();
  	// this.router.navigate(['/login']);
  }
}
