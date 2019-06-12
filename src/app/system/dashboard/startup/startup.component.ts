import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-startup-dashboard-cmp',
  templateUrl: './startup.component.html'
})
export class StartupDashboardComponent implements OnInit {

    @Input() Me: UserModel;
    constructor() {
    }

    ngOnInit() {
    }
}
