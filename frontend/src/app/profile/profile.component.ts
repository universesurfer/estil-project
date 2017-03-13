import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { SessionService } from "./../session.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgZone } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  role: any;
  editCheck: boolean = false;
  error: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    private toastr: ToastsManager,
    public el: ElementRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    console.log("google", google);
    //subscribe webuser id
  	this.route.params.subscribe(params => {
      this.getUserDetails(params['id']);
    });

    //assign role for use in html
    this.role = localStorage.getItem('role');

    // update session url
    this.session.url = this.router.url;
    this.session.checkHome();
  }

  ngAfterViewInit(){
    this.updateLocationEventListener();
  }

  getUserDetails(id) {
    this.session.get()
      .subscribe((response) => {
        this.user = response;
        console.log(this.user);
      });
  }

  profileToggle() {

    if(this.editCheck != true) {
      this.editCheck = true;
    } else {
      this.editCheck = false;
      this.session.edit(this.user)
        .subscribe(result => {
            if (result) {
              // this.router.navigate(['/profile']);
              this.toastr.success('User updated');
       			} else {
              this.toastr.error('Something went wrong');
            }
        });
    }

  }

  updateLocationEventListener() {

    var stylistLocation = document.getElementById('location');
    var stylistPlace = new google.maps.places.Autocomplete(stylistLocation);

    var googleEventListener = google.maps.event.addListener(stylistPlace, 'place_changed', function() {
      this.zone.run(() => {
      	var place = stylistPlace.getPlace();
        console.log("place",place);

      	this.user.lng = place.geometry.location.lng();
      	this.user.lat = place.geometry.location.lat();
      	this.user.location = place.formatted_address;
      })

      this.session.edit(this.user)
        .subscribe(result => {
            if (result) {
              // this.router.navigate(['/profile']);
              this.toastr.success('Location updated');
       			} else {
              this.toastr.error('Something went wrong');
            }
        });

    }.bind(this));
  }

}
