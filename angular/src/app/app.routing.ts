import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginStylistComponent } from './login-stylist/login-stylist.component';
import { SignupStylistComponent } from './signup-stylist/signup-stylist.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'stylist/login', component: LoginStylistComponent },
    { path: 'stylist/signup', component: SignupStylistComponent },
];
