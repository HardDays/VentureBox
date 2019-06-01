import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { MilestonesModel } from 'src/app/core/models/milestones.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { MilestonesService } from 'src/app/core/services/milestones.service';
import { TypeService } from 'src/app/core/services/type.service';
import { Router } from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'milestones-edit-cmp',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class MilestonesEditComponent implements OnInit {


    Mode = "edit";

     Errors = {
      title: '',
      finish_date: ''
    };

    Milestone: MilestonesModel = new MilestonesModel();
    Id = 0;
    isShowDatapicker = false;


    constructor(
                private auth: AuthService,
                private milsestonesService: MilestonesService,
                private type: TypeService,
                private router: Router,
                private actRoute: ActivatedRoute) {
      actRoute.params.subscribe(params => {
        this.Id = +params['id'];
      });
    }

    ngOnInit() {

      this.GetCurrenMilestone();
    }

    GetCurrenMilestone() {
      this.milsestonesService.GetMilestonsById(this.auth.Me.id,  this.auth.Me.company_id, this.Id)
        .subscribe(
          (res) => {
             this.Milestone = res.json();
             this.Milestone.user_id = this.auth.Me.id;
             this.Milestone.company_id = this.auth.Me.company_id;

             this.Milestone.finish_date = this.Milestone.finish_date ? this.Milestone.finish_date.split('T')[0] : '';
          }
        );
    }

    cancel() {
      this.Milestone = new MilestonesModel();
    }

    saveMilestone() {
      this.milsestonesService.PatchMileston(this.Milestone)
        .subscribe(
          (res) => {
            this.router.navigate(['/system', 'my_milestones']);
          },
          (err) => {
            this.Errors = this.type.GetErrorsDictByResponse(err.json(), this.Errors);
          }
        );
    }

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy-mm-dd',
        inline: true
    };

    onDateChanged(event) {
      this.Milestone.finish_date = event.formatted;
      this.isShowDatapicker = false;
    }
}
