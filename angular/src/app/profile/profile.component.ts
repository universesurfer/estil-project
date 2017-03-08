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

}
