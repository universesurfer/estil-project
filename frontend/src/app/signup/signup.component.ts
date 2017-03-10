import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

newUser = {
    firstName: '',
    lastName:  '',
    username: '',
    password: '',
 };

newStylist = {
     firstName: '',
     lastName:  '',
     username: '',
     password: '',
     location : '',
     resume : ''
  };

 stylistCheck: boolean = false;
 error: string;

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  signUp() {

    this.session.signup(this.newUser)
      .subscribe(result => {
          if (result) {
              // login successful
              console.log('result ok', result);
              this.router.navigate(['/profile']);
          } else {
          		console.log('result ko', result);
              // login failed
              // this.error = 'Username or password is incorrect';
          }
      });

  }

  signUpStylist() {

    this.session.signup(this.newStylist)
      .subscribe(result => {
          if (result === true) {
              // login successful
              console.log('result ok', result);
              this.router.navigate(['/profile']);
          } else {
          		console.log('result ko', result);
              // login failed
              // this.error = 'Username or password is incorrect';
          }
      });

  }
}
