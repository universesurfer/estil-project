import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.session.url = this.router.url;
    this.session.checkHome();
    console.log(this.session.url);
  }

}
