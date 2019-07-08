import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard-cmp',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    Me: UserModel = new UserModel();
    constructor(private dashboard: DashboardService, private _router: Router )
    {
      this.dashboard.MeChanged.subscribe(
        (model) => {
          this.Me = model;
          this.CheckMe();
        }
      )
    }

    ngOnInit()
    {
      this.Me = this.dashboard.Me;
      if (!this.Me || !this.Me.id) {
        this._router.navigate(['/auth']);
        return;
      }
    }

    CheckMe()
    {
      if(!this.Me || !this.Me.id)
      {
        this._router.navigate(['/auth']);
      }
    }



}
