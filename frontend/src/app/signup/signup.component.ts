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
    //  resume : ''
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
              // signup successful
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

  // ngAfterViewInit() {
  //   // const hostElem = this.el.nativeElement;
  //   // console.log(hostElem.children);
  //   // console.log(hostElem.parentNode);
  //
  //  console.log(this.el.nativeElement.querySelector('#stylist-location'));
  // }
  //
  // updateLocationEventListener() {
  //   // console.log(this);
  //   // var stylistLocation = this.elementRef.nativeElement.value;
  //
  //   console.log(this.el.nativeElement);
  //
  //   const hostElem = this.el.nativeElement.querySelector('#stylist-location');
  //   console.log(hostElem);
  //
  //   var stylistPlace = new google.maps.places.Autocomplete(hostElem);
  //
  //   google.maps.event.addListener(stylistPlace, 'place_changed', function() {
  //   	var place = stylistPlace.getPlace();
  //   	this.user.lng = place.geometry.location.lng();
  //   	this.user.lat = place.geometry.location.lat();
  //   	this.user.location = place.formatted_address;
  //
  //   }.bind(this));
  // }
}
