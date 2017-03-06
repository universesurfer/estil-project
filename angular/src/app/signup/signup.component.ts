import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SessionService]
})
export class SignupComponent implements OnInit {

formInfo = {
    firstName: '',
    lastName:  '',
    username: '',
    password: '',
 };

 formInfoStylist = {
     firstName: '',
     lastName:  '',
     username: '',
     password: '',
     location : '',
     resume : ''
  };

 stylistCheck: boolean = false;
 user: any;
 stylist: any;
 error: string;

  constructor(
    private session: SessionService
  ) { }

  ngOnInit() {

  }

  signUp() {
    this.session.signup(this.formInfo)
      .subscribe(
        (user) => this.user = user,
        (err) => this.error = err
      );
  }

  signUpStylist() {
    this.session.signupStylist(this.formInfo)
      .subscribe(
        (stylist) => this.stylist = stylist,
        (err) => this.error = err
      );
  }

  errorCb(err) {
  this.error = err;
  this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }

}
