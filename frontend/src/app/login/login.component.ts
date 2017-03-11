import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: ''
  };

  stylist = {
    username: '',
    password: ''
  };

  stylistCheck: boolean = false;
  error: string;
  userCheck: boolean = false;

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logIn() {
    this.session.login(this.user)
      .subscribe(result => {
          if (result === true) {
            // login successful
            this.router.navigate(['/profile']);
     			} else {
            // login failed
            this.error = 'Username or password is incorrect';
          }
      });
  }

  logInStylist() {
    this.session.loginStylist(this.stylist)
      .subscribe(result => {
          if (result == true) {
            // login successful
            this.router.navigate(['/profile']);

     			} else {
            // login failed
            this.error = 'Username or password is incorrect';
          }
      });
  }
}
