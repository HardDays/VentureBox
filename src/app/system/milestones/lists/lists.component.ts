import { AuthService } from './../../../core/services/auth.service';
import { MilestonesModel } from './../../../core/models/milestones.model';
import { MilestonesService } from './../../../core/services/milestones.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'milestones-lists-cmp',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class MilestonesListsComponent implements OnInit {

    Milestones: MilestonesModel[] = [];

    constructor(
      private auth: AuthService,
      private milestonesService: MilestonesService) {
    }

    ngOnInit() {
      this.getList();
    }

    getList () {
      this.milestonesService.GetMilestons( this.auth.Me.id,  this.auth.Me.company_id)
        .subscribe(
          (res) => {
            this.Milestones = res.json()['items'];
          }
        );
    }



}
