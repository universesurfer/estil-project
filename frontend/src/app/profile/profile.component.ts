import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SessionService } from "./../session.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  editCheck: boolean = false;
  error: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    private toastr: ToastsManager ) {}

  ngOnInit() {
  	this.route.params.subscribe(params => {
      this.getUserDetails(params['id']);
    });

    this.session.url = this.router.url;
    this.session.checkHome();
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
              // this.router.navigate(['/profile']);
              this.toastr.success('User updated');
       			} else {
              this.toastr.error('Something went wrong');
            }
        });
    }

  }

}
