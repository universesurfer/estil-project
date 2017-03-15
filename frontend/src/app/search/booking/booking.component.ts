import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from "../../search.service";

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
    private searchService: SearchService
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

    var stylistName = this.stylist.firstName + " " + this.stylist.lastName;

    var appointmentData = {
      stylist: this.stylist._id,
      stylistName: stylistName,
      user: this.userId,
      date: this.date,
      startTime: requestTime
    }

    console.log(appointmentData);

    this.searchService.sendAppointment(appointmentData)
      .subscribe((response) => {
        console.log(response);

    })
  }

}
