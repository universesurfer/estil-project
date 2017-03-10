import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';

import { SessionService } from './session.service';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [SessionService]},
    { path: 'search', component: SearchComponent,
    children: [
      // { path: 'book-stylist', component: ListComponent },
    ]
  }
];
