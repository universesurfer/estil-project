import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: '',
    role: "user"
  };

  stylist = {
    username: '',
    password: '',
    role: "stylist"
  };

  webUser = {};

  stylistCheck: boolean = false;
  error: string;
  userCheck: boolean = false;

  constructor(
    private session: SessionService,
    private router: Router,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.session.url = this.router.url;
    this.session.checkHome();
  }

  logIn(webUser) {
    if (webUser.role == "user") {
      this.webUser = this.user;
    }
    else if (webUser.role == "stylist") {
        this.webUser = this.stylist;
    }

    this.session.login(this.webUser)
      .subscribe(result => {
          if (result === true) {
            this.router.navigate(['/profile']);
            this.toastr.success('You logged in successfully');
     			} else {
            this.toastr.error('Username or password is incorrect');
          }
      });
  }
}
