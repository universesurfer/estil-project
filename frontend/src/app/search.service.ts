import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SearchService {

  BASE_URL: string = 'http://localhost:3000';

  constructor(
  private router: Router,
  private http: Http
  ) {}

  search(location) {
    return this.http.post(`${this.BASE_URL}/api/search`,location)
      .map(res => res.json())
      .catch(this.handleError);
  }

  sendAppointment(appointmentData) {
    console.log("service",appointmentData);
    return this.http.post(`${this.BASE_URL}/api/appointment`, appointmentData)
      .map((response) => {
        console.log("response");
        response.json();
      })
      .catch((err) => Observable.throw(err));
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }


}
