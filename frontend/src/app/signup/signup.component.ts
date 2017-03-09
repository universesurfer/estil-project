import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


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
     location : ''
    //  resume : ''
  };

 stylistCheck: boolean = false;
 error: string;

  constructor(
    private session: SessionService,
    private router: Router,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {

  }

  signUp() {
    this.session.signup(this.newUser)
      .subscribe(result => {
          if (result) {
              console.log('result ok', result);
              this.router.navigate(['/login']);
              this.toastr.success('You have been registered, please log in');
          } else {
                console.log('result ko', result);
              this.toastr.error('Something went wrong, please try again');
              // login failed
              // this.error = 'Username or password is incorrect';
          }
      });
  }

  signUpStylist() {
    console.log('hey');
    this.session.signupStylist(this.newStylist)
      .subscribe(result => {
          if (result) {
              // signup successful
              this.router.navigate(['/login']);
              this.toastr.success('You have been registered, please log in');
          } else {
              this.toastr.error('Something went wrong, please try again');
              // login failed
              // this.error = 'Username or password is incorrect';
          }
      });
  }
}
