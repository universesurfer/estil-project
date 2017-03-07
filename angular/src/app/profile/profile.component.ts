import { Component, OnInit } from '@angular/core';
import { SessionService } from "./../session.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [SessionService]
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService) { }

  ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     // this.user = +params['id'];
  //     this.getUserDetails(params['id']);
  //     console.log((params));
  //   });
  //   // this.username = this.session.user.name,
  //   // this.secret   = this.session.user.secret;
  // }
  //
  // getUserDetails(id) {
  //   this.session.get()
  //     .subscribe((user) => {
  //       this.user = user;
  //     });
  }

}
