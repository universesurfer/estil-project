import { Component, OnInit } from '@angular/core';
import { SessionService } from "./../session.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  userCheck: boolean = false;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
      this.getUserDetails(params['id']);
    });
  }

  getUserDetails(id) {
    this.session.get()
      .subscribe((response) => {
        this.user = response;
      });
  }

  userCheckUpdate() {
    if (this.userCheck != true) {
        this.userCheck = true;
    } else {
      this.userCheck = false;
    }
  }

  edit() {
    this.session.edit(this.user)
      .subscribe(result => {
        console.log(result);
        console.log(this.user);
          if (result === true) {
            // login successful
            this.router.navigate(['/profile']);
     			} else {
            // login failed
            this.error = 'User cannot be updated';
          }
      });
  }

}
