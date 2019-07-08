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

  isOpenModal = false;
  Date = '';
  CompanyId = 0;

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
          console.log(`Investors = `, this.Investors);
        },
        (err) => {
          console.log(`err = `, err);
        }
      );
    }
  }

  OpenModal (dateId: number, companyId: number) {
    this.isOpenModal = true;
    this.Date = this.Axis[dateId];
    this.CompanyId = companyId;
    console.log(this.Date, this.CompanyId);
  }

  PaidToProject() {
    this.isOpenModal = false;
    this.trackingService.AddTracking(
      this.Date,
      this.CompanyId,
      (res) => {
        console.log(`Success: `, res);
      }
    );
  }

}
