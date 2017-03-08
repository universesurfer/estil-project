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

  getMarkers() {
    return this.http.get(`${this.BASE_URL}/api/search`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }


}
