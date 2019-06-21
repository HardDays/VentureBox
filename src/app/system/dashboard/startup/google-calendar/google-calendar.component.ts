import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { GoogleService } from 'src/app/core/services/google.service';

@Component({
  selector: 'app-google-calendar',
  templateUrl: './google-calendar.component.html',
  styleUrls: ['./google-calendar.component.scss']
})
export class GoogleCalendarComponent implements OnInit {

  HasGoogleCalendar = false;
  CalendarSignInStep = 1;
  CalendarsList: {name: string, id: string}[] = [];
  CalendarSelected = {id: '', name: ''};
  IsOpenCalendarSelected = false;

  EventsList: {link: '', name: '', start: ''}[] = [];

  constructor(private authService: AuthService, private googleService: GoogleService) { }

  ngOnInit() {
    if (this.authService.Me) {
      this.HasGoogleCalendar = this.authService.Me.has_google_calendar;
    }
    if (this.HasGoogleCalendar) {
      this.GetEvents();
    }
    this.authService.onMeChange$.subscribe(
      () => {
        if (this.authService.Me){
          this.HasGoogleCalendar = this.authService.Me.has_google_calendar;
          if (this.HasGoogleCalendar) {
            this.GetEvents();
          }
        }
      }
    );
  }

  googleIn() {
    this.googleService.signIn(
      (res) => {
        this.googleService.SetGoogleAuthCode(
          res.refresh_token,
          res.access_token,
            (calendarRes) => {
              this.CalendarsList = calendarRes.calendars;
              this.CalendarSignInStep = 2;
            }
          );
      }
    );
  }

  setGoogleCalendar() {
    this.googleService.SetGoogleCalendar(
      this.CalendarSelected.id,
        (res) => {
          console.log(res);
          this.HasGoogleCalendar = true;
          this.authService.Me.has_google_calendar = true;
          this.GetEvents();
        }
      );
  }


  GetEvents() {
    this.googleService.GetGoogleEvents(
      (res) => {
        this.EventsList = res.events;
      },
      (err) => {
        this.CalendarSignInStep = 1;
        this.HasGoogleCalendar = false;
        this.authService.Me.has_google_calendar = false;
      }
    );
  }

  openInNewTab(link: string) {
      var win = window.open(link, '_blank');
      win.focus();
  }

}
