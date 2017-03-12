import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SessionService implements CanActivate{
  public token: string;
  isAuth: EventEmitter<any> = new EventEmitter();
  userId : string;
  role: string;
  stylistId : string;

  BASE_URL: string = 'http://localhost:3000';

  constructor(
    private router: Router,
    private http: Http
  ) {
    this.token = localStorage.getItem('token');
    if (this.token != null) {
      this.isAuth.emit(true);
    } else {
      this.isAuth.emit(false);
    }
  }

  get() {
    this.userId = localStorage.getItem('id');
    this.role = localStorage.getItem('role');

    return this.http.get(`${this.BASE_URL}/profile/${this.role}/${this.userId}`)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  edit(user) {
    this.userId = localStorage.getItem('id');

    return this.http.put(`${this.BASE_URL}/profile/${this.role}/${this.userId}`, user)
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
          // login successful if there's a jwt token in the response
          let token = response.json() && response.json().token;

          if (token) {
            // set token property
            this.token = token;
            this.isAuth.emit(true);
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', token );
            localStorage.setItem('id', response.json().user._id);
            localStorage.setItem('role', response.json().role);
            this.router.navigate(['/profile']);
            // return true to indicate successful login
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
      });
  }

  logout() {
      // clear token remove user from local storage to log user out
      this.token = null;
      this.isAuth.emit(false);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.router.navigate(['/login']);

   }
}
