import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from "../../session.service";
import { MainService } from "../../main.service";
import { NgZone } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
@Input() stylist: any;

  date: string;
  hour: string = "12";
  minute: string = "00";
  ampm: string = "pm";
  userId: any;
  board: string;

  BASE_URL: string = 'http://localhost:3000';

  constructor(
    private session: SessionService,
    private mainService: MainService,
    private zone: NgZone,
    private toastr: ToastsManager
  ) { }

  ngOnChanges() {
    //have to change board to undefined to reload the form in the html, the only way to get the pinterest board to update between stylists
    this.board = undefined;

      this.session.getBoard(this.stylist._id)
        .subscribe((response) => {
          this.zone.run(() => {
            this.board = response.user.board;
            console.log(this.board);
            console.log(this.stylist);
            this.mainService.runPinterest();
        });
    });
  }

  ngOnInit() {
    var date = new Date();
    this.date = this.formatDate(date);

    this.userId = localStorage.getItem("id");

    console.log(this.stylist);

  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  makeAppointment(){
    var requestTime = this.hour + ":" + this.minute + this.ampm;

    var stylistName = this.stylist.firstName + " " + this.stylist.lastName;

    var appointmentData = {
      stylist: this.stylist._id,
      stylistName: stylistName,
      user: this.userId,
      date: this.date,
      startTime: requestTime
    }

    this.mainService.sendAppointment(appointmentData)
      .subscribe((response) => {
        console.log(response);
        if (response) {
          this.toastr.success('Appointment saved to your Profile');
        } else {
          this.toastr.error('Something went wrong');
        }

    })
  }

}
