import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SessionService } from "./../session.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FileUploader } from 'ng2-file-upload';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

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

  BASE_URL: string = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    private toastr: ToastsManager,
    private http: Http ) {
    }

  ngOnInit() {
  	this.route.params.subscribe(params => {
      this.getUserDetails(params['id']);
    });

    this.session.url = this.router.url;
    this.session.checkHome();

    this.id = localStorage.getItem('id');
    this.role = localStorage.getItem('role');

    this.uploader = new FileUploader({
        url:`${this.BASE_URL}/profile/${this.role}/${this.id}`
        // authToken: `JWT ${this.session.token}`
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

  getUserDetails(id) {
    this.session.get()
      .subscribe((response) => {
        this.user = response;
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

}
