import { Component, OnInit} from '@angular/core';
import { MainService } from "../main.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mainService.url = this.router.url;
    this.mainService.checkHome();
  }

}
