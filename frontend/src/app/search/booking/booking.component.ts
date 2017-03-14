import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';


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

  BASE_URL: string = 'http://localhost:3000';

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
    var date = new Date();
    this.date = this.formatDate(date);

    this.userId = localStorage.getItem("id");

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
    console.log(this.date, requestTime);
    console.log(this.userId);

    var appointmentData = {
      stylistId: this.stylist._id,
      userId : this.userId,
      appointmentDate: this.date,
      appointmentTime: requestTime
    }

    console.log(appointmentData);

    return this.http.post(`{this.BASE_URL}/api/appointment`, appointmentData);
  }

}
