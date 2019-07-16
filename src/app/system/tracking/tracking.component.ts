import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { TrackingService } from 'src/app/core/services/tracking.service';

interface InvestorsModel {
    name: string;
    months: [{
      title: string,
      amount: number,
      payed: boolean
    }];
    total_investment: number;
    debt: number;
    company_id: number;
}

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {

  MyRole = '';
  Axis: string[] = [];
  Investors: InvestorsModel[] = [];
  Companies: InvestorsModel[] = [];

  isOpenModal = false;
  Date = '';
  CompanyId = 0;
  Amount = 0;

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
          if(this.MyRole === 'startup')
            this.GetInvestorsInfo(res.investors);
          else
            this.GetInvestorsInfo(res.companies);
        },
        (err) => {
          console.log(`err = `, err);
        }
      );
    }
  }

  GetInvestorsInfo (investors) {
    this.Investors = [];
    // tslint:disable-next-line: forin
    for (const el in investors) {
    for (const item in investors[el]) {
      const tmp: InvestorsModel = {
        name: '',
        months: [{
          title: '',
          amount: 0,
          payed: false
        }],
        total_investment: 0,
        debt: 0,
        company_id: 0
      };
      tmp.name = item;
      tmp.debt = investors[el][item].debt;
      tmp.total_investment = investors[el][item].total_investment;
      if(investors[el][item].company_id)
        tmp.company_id = investors[el][item].company_id;

      for (const month of this.Axis) {
        for (const info in investors[el][item]) {
          if (info.length && month === info) {
             tmp.months.push({
               title: info,
               payed: investors[el][item][info]['payed'],
               amount: investors[el][item][info]['amount']
             });
          }
        }
      }

      this.Investors.push(tmp);
    }
    }
  }



  OpenModal (dateId: number, companyId: number, amount: number) {
    this.isOpenModal = true;
    this.Date = this.Axis[dateId];
    this.CompanyId = companyId;
    this.Amount = amount;
  }

  PaidToProject() {
    this.isOpenModal = false;
    this.trackingService.AddTracking(
      this.Date,
      this.CompanyId,
      (res) => {
        this.GetTrackingList();
      }
    );
  }

}
