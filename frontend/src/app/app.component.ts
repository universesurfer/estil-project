import { Component, ViewContainerRef, HostListener, NgZone} from '@angular/core';
import { SessionService } from "./session.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SessionService]
})
export class AppComponent {
  title = 'app works!';
  innerHeight: string;
  innerWidth: string;

  user: any;
  error: string;

  constructor(
    private session: SessionService,
    public toastr: ToastsManager,
    vRef: ViewContainerRef,
    ngZone: NgZone) {
    this.toastr.setRootViewContainerRef(vRef);

    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    window.onresize = (e) =>
      { ngZone.run(() => {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
      });
    };
  }


}
