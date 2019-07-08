import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { TrackingService } from 'src/app/core/services/tracking.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {

  MyRole = '';
  Axis: string[] = [];
  Investors: any[] = [];

  constructor(private authService: AuthService, private trackingService: TrackingService) { }

  ngOnInit() {
    this.MyRole = this.authService.Me ? this.authService.Me.role : '';
    this.GetTrackingList();
    this.authService.onMeChange$.subscribe(
      () => {
        if (this.authService.Me){
          this.MyRole = this.authService.Me.role;
          this.GetTrackingList();
        }
      }
    );
  }

  GetTrackingList () {
    if (this.MyRole) {
      this.trackingService.GetTrackings(
        this.MyRole === 'startup' ? this.MyRole : 'investor',
        (res) => {
          this.Axis = res.axis;
          this.Investors = res.investors;
          console.log(`Axis = `, this.Axis);
        },
        (err) => {
          console.log(`err = `, err);
        }
      );
    }
  }

}
