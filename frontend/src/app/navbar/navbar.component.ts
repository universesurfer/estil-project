import { Component, OnInit} from '@angular/core';
import { SessionService } from '../session.service';
import { MainService } from '../main.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuth: boolean;
  home: boolean;
  url: string;

  constructor(
    private session: SessionService,
  	private mainService: MainService,
  	private router:  Router
  ) {
    this.session.isAuth
        .subscribe((isAuth: boolean) => {
          this.isAuth = isAuth;
        });
      if (this.session.token != null) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }

    this.mainService.home
      .subscribe((home: boolean) => {
        this.home = home;
      })
    if (this.mainService.url == "/home") {
      this.home = true;
    } else {
      this.home = false;
    }

  }

  ngOnInit() {

  }


  logout() {
  	this.session.logout();
  }
}
