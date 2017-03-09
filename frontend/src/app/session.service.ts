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

  userId : string;

  get() {
    this.userId = localStorage.getItem('userId');
    return this.http.get(`${this.BASE_URL}/profile/${this.userId}`)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  edit(user) {
    this.userId = localStorage.getItem('userId');
    return this.http.put(`${this.BASE_URL}/profile/${this.userId}`, user)
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
  		.map((response) => response.json())
  		.map((response) => {
  			let token = response.token;
  			if (token) {
          // set token property
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', token );
          localStorage.setItem('user._id', user._id);
          this.isAuth.emit(true);
          this.router.navigate(['/profile']);
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
  		})
  		.catch((err) => Observable.throw(err));
  }

  signupStylist(stylist) {
  	return this.http.post(`${this.BASE_URL}/stylist/signup`, stylist)
  		.map((response) => response.json())
  		.map((response) => {
  			let token = response.token;
  			if (token) {
          // set token property
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', token );
          localStorage.setItem('stylist._id', stylist._id);
          this.isAuth.emit(true);
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
  		})
  		.catch((err) => Observable.throw(err));
  }

  login(user) {
    return this.http.post(`${this.BASE_URL}/login`, user)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let token = response.json() && response.json().token;

            if (token) {
              // set token property
              this.token = token;
              this.isAuth.emit(true);
              // store username and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('token', token );
              localStorage.setItem('userId', response.json().user._id);
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
