import { Component, OnInit, ViewContainerRef, ElementRef} from '@angular/core';
import { SessionService } from "./../session.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FileUploader } from 'ng2-file-upload';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { NgZone } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  editCheck: boolean = false;
  error: string;
  id: string;
  role: string;
  uploader: FileUploader;
  appointments: any;
  days: any = {};

  BASE_URL: string = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    private toastr: ToastsManager,
    private http: Http,
    public el: ElementRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
  	this.route.params.subscribe(params => {
      this.getUserDetails(params['id']);
    });

    // update session url
    this.session.url = this.router.url;
    this.session.checkHome();

    this.id = localStorage.getItem('id');
    this.role = localStorage.getItem('role');

    this.uploader = new FileUploader({
        url:`${this.BASE_URL}/profile/${this.role}/${this.id}`
      });

    this.uploader.onSuccessItem = (item, response) => {
      return this.http.post(`${this.BASE_URL}/profile/${this.role}/${this.id}`, item)
      .map((response) => {
        response.json();
      })
      .catch((err) => Observable.throw(err));
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      console.log('Error', response)
    };

  }

  ngAfterViewInit(){
    if (this.role == 'stylist') {
      this.updateLocationEventListener();
    }
  }

  getUserDetails(id) {
    this.session.get()
      .subscribe((response) => {
        this.user = response.user;
        this.appointments = response.app;
      });
  }

  profileToggle() {

    if(this.editCheck != true) {
      this.editCheck = true;
    } else {

      console.log(this.days);

      this.editCheck = false;
      this.session.edit(this.user)
        .subscribe(result => {
            if (result) {
              this.toastr.success('User updated');
       			} else {
              this.toastr.error('Something went wrong');
            }
        });
    }
  }


 addAvatar(){
   this.uploader.onBuildItemForm = (item, form) => {
   };
   this.uploader.uploadAll();
   location.reload();
 }

  updateLocationEventListener() {

    var stylistLocation = document.getElementById('location');
    var stylistPlace = new google["maps"].places.Autocomplete(stylistLocation);

    google["maps"].event.addListener(stylistPlace, 'place_changed', function() {
      this.zone.run(() => {
      	var place = stylistPlace.getPlace();
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

  here(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showMapWithMyLocation.bind(this));
    } else {
      alert('Oops, no geolocation support');
    }
  }
  showMapWithMyLocation(position) {

    this.zone.run(() => {
      this.user.lng = position.coords.longitude;
      this.user.lat = position.coords.latitude;

      var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var geocoder = new google.maps.Geocoder;

      var that = this;

      geocoder.geocode({'location': {"lat":position.coords.latitude, "lng":position.coords.longitude}}, function(results, status) {
        console.log(results[0]["formatted_address"]);
        that.user.location = results[0]["formatted_address"];

        that.session.edit(that.user)
          .subscribe(result => {
              if (result) {
                // this.router.navigate(['/profile']);
                that.toastr.success('Location updated');
              } else {
                that.toastr.error('Something went wrong');
              }
          });
      });
    })
  }

}
