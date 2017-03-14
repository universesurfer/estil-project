import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from "../search.service";

@Component({
  selector: 'app-search-booking',
  templateUrl: './search-booking.component.html',
  styleUrls: ['./search-booking.component.css'],
  providers: [SearchService]
})
export class SearchBookingComponent implements OnInit {
@Input() stylist: any;

  date: string;
  hour: string = "12";
  minute: string = "00";
  ampm: string = "pm";
  userId: any;
  appointmentData: any;
  stylistName: any;
  requestTime: any;

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
    this.requestTime = this.hour + ":" + this.minute + this.ampm;
    console.log(this.date, this.requestTime);
    console.log(this.userId);

    this.stylistName = this.stylist.firstName + " " + this.stylist.lastName;

    this.appointmentData = {
      stylist: this.stylist._id,
      stylistName: this.stylistName,
      user: this.userId,
      date: this.date,
      startTime: this.requestTime
    }

    console.log(this.appointmentData);

    console.log(this.searchService);

    this.searchService.sendAppointment(this.appointmentData)
      .subscribe((response) => {
        console.log(response);

    })
  }

}
