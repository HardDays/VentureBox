import { TypeService } from './../../../core/services/type.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MilestonesModel } from 'src/app/core/models/milestones.model';
import { MilestonesService } from 'src/app/core/services/milestones.service';

@Component({
  selector: 'milestones-create-cmp',
  templateUrl: './../edit/edit.component.html',
  styleUrls: ['./../edit/edit.component.css']
})
export class MilestonesCreateComponent implements OnInit {

    Mode = "create";

    Errors = {
      title: '',
      finish_date: ''
    };

    Milestone: MilestonesModel = new MilestonesModel();
    constructor(
                private auth: AuthService,
                private milsestonesService: MilestonesService,
                private type: TypeService,
                private router: Router) {
    }

    ngOnInit() {
      this.Milestone.user_id = this.auth.Me.id;
      this.Milestone.company_id = this.auth.Me.company_id;
    }

    cancel() {
      this.Milestone = new MilestonesModel();
    }

    saveMilestone() {
      this.milsestonesService.PostMilestones(this.Milestone)
        .subscribe(
          (res) => {
            this.router.navigate(['/system', 'my_milestones']);
          },
          (err) => {
            this.Errors = this.type.GetErrorsDictByResponse(err.json(), this.Errors);
          }
        );
    }



}
