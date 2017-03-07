import { Component } from '@angular/core';
import { SessionService } from "./session.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SessionService]
})
export class AppComponent {
  title = 'app works!';

  user: any;
  error: string;

  constructor(
    private session: SessionService
  ) { }

}
