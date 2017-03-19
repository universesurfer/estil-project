import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

declare var window: any;
declare var document: any;

@Injectable()
export class MainService {

  BASE_URL: string = 'http://localhost:3000';
  home: EventEmitter<any> = new EventEmitter();
  public url: string;

  constructor(
  private router: Router,
  private http: Http
  ) {}

  runPinterest(){
    (function (w, d, scriptUrl) {

    var firstScript, newScript, hazPinIt;

    // generate an unique-ish global ID: hazPinIt_ plus today's Unix day
    hazPinIt = 'PIN_' + ~~(new Date().getTime() / 86400000);

    if (!w[hazPinIt]) {

      // don't run next time
      w[hazPinIt] = false;

      // avoid KB927917 error in IE8
      w.setTimeout(function () {

        // load the bulk of pinit.js
        firstScript = d.getElementsByTagName('SCRIPT')[0];
        newScript = d.createElement('SCRIPT');
        newScript.type = 'text/javascript';
        newScript.async = true;
        newScript.src = scriptUrl;
        firstScript.parentNode.insertBefore(newScript, firstScript);

      }, 10);

    }
  }(window, document, '//assets.pinterest.com/js/pinit_main.js'));
  }

  checkHome(){
    if (this.url == "/home") {
      this.home.emit(true);
    } else {
      this.home.emit(false);
    }
  }

  search(location) {
    var locationObject = {"location" : location}
    return this.http.post(`${this.BASE_URL}/api/search`,locationObject)
      .map(res =>
        res.json()
      )
      .catch(this.handleError);
  }

  sendAppointment(appointmentData) {
    return this.http.post(`${this.BASE_URL}/api/appointment`, appointmentData)
      .map(res =>
        res.json()
      )
      .catch(this.handleError);
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }


}
