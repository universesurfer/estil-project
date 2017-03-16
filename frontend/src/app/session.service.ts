import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate} from '@angular/router';
import { Observable } from 'rxjs/Rx';

declare var window: any;
declare var document: any;

@Injectable()
export class SessionService implements CanActivate{
  public token: string;
  isAuth: EventEmitter<any> = new EventEmitter();
  id : string;
  role: string;
  stylistId : string;
  home: EventEmitter<any> = new EventEmitter();
  public url: string;

  BASE_URL: string = 'http://localhost:3000';

  constructor(
    private router: Router,
    private http: Http,
  ) {
    this.token = localStorage.getItem('token');
    if (this.token != null) {
      this.isAuth.emit(true);
    } else {
      this.isAuth.emit(false);
    }

  }

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

  get() {
    this.id = localStorage.getItem('id');
    this.role = localStorage.getItem('role');

    return this.http.get(`${this.BASE_URL}/profile/${this.role}/${this.id}`)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  getBoard(id) {
    this.id = id;
    this.role = "stylist";

    return this.http.get(`${this.BASE_URL}/profile/${this.role}/${this.id}`)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  edit(user) {
    this.id = localStorage.getItem('id');
    return this.http.put(`${this.BASE_URL}/profile/${this.role}/${this.id}`, user)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  getPrivateData() {
    return this.http.get(`/profile`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/login']);
    this.isAuth.emit(true);
    return false;
  }

  isAuthenticated() {
    return this.token != null ? true : false;
  }

  signup(user) {
  	return this.http.post(`${this.BASE_URL}/signup`, user)
    .map((response) => {
      response.json();
      return true;
    })
    .catch((err) => Observable.throw(err));
  }

  signupStylist(stylist) {
  	return this.http.post(`${this.BASE_URL}/stylist/signup`, stylist)
  		.map((response) => {
        response.json();
        return true;
      })
  		.catch((err) => Observable.throw(err));
  }

  login(webUser) {
    return this.http.post(`${this.BASE_URL}/login`, webUser)
      .map((response: Response) => {
          let token = response.json() && response.json().token;

          if (token) {
            // set token property
            this.token = token;
            this.isAuth.emit(true);
            localStorage.setItem('token', token );
            localStorage.setItem('id', response.json().user._id);
            localStorage.setItem('role', response.json().role);
            this.router.navigate(['/profile']);
            // return true for successful login
            return true;
          } else {
            // return false for failed login
            return false;
          }
      });
  }

  logout() {
      // clear token remove user from local storage to log user out
      this.token = null;
      this.isAuth.emit(false);
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      this.router.navigate(['/login']);

   }
}
