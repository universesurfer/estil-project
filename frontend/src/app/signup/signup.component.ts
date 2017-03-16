import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var google: any;

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
    password: ''
 };

newStylist = {
     firstName: '',
     lastName:  '',
     username: '',
     password: '',
     location : ''
  };

 stylistCheck: boolean = false;
 error: string;

  constructor(
    private session: SessionService,
    private router: Router,
    private toastr: ToastsManager,
    public renderer: Renderer,
    public el: ElementRef
  ) { }

  ngOnInit() {
    this.session.url = this.router.url;
    this.session.checkHome();
  }

  signUp() {
    this.session.signup(this.newUser)
      .subscribe(result => {
          if (result) {
              this.router.navigate(['/login']);
              this.toastr.success('You have been registered, please log in');
          } else {
              this.toastr.error('Something went wrong, please try again');
          }
      });
  }

  signUpStylist() {
    this.session.signupStylist(this.newStylist)
      .subscribe(result => {
          if (result) {
              this.router.navigate(['/login']);
              this.toastr.success('You have been registered, please log in');
          } else {
              this.toastr.error('Something went wrong, please try again');
          }
      });
  }

}
