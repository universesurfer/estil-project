import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './search/booking/booking.component';

import { SessionService } from "./session.service";
import { SearchService } from "./search.service";
import { RouterModule } from "@angular/router";
import { routes } from './app.routing';
import { DropdownModule } from "ngx-dropdown";
import { CustomFormsModule } from 'ng2-validation';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { FileSelectDirective } from "ng2-file-upload";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    NavbarComponent,
    SearchComponent,
    HomeComponent,
    FileSelectDirective,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    DropdownModule,
    CustomFormsModule,
    ToastModule.forRoot()
  ],
  providers: [SessionService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
