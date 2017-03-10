import { Component, ViewContainerRef } from '@angular/core';
import { SessionService } from "./session.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
    private session: SessionService,
    public toastr: ToastsManager,
    vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef)
  }
}
