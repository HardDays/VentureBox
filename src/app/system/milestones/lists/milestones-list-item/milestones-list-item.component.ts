import { AuthService } from 'src/app/core/services/auth.service';
import { MilestonesService } from './../../../../core/services/milestones.service';
import { MilestonesModel } from './../../../../core/models/milestones.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-milestones-list-item',
  templateUrl: './milestones-list-item.component.html',
  styleUrls: ['./milestones-list-item.component.scss']
})
export class MilestonesListItemComponent implements OnInit {

  @Input() Item: MilestonesModel = new MilestonesModel();

  isShowFullDescription = false;

  isCompletedListOpened =  false;

  Date = '';
  InPast = false;

  constructor(private milsestonesService: MilestonesService, private auth: AuthService) { }

  ngOnInit() {
    this.Item.user_id = this.auth.Me.id;
    this.Item.company_id = this.auth.Me.company_id;
    this.Date = this.Item.finish_date;
    delete this.Item.finish_date;

    const today = new Date(new Date().toDateString());
    const item = new Date(new Date(this.Date).toDateString());
    this.InPast = false;
  }

  saveMilestone() {
    if (this.Item.completeness) {
      this.Item.is_done = true;
    }
    this.milsestonesService.PatchMileston(this.Item)
      .subscribe(
        (res) => {
          this.Item.is_done = true;
        },
        (err) => {
        }
      );
    }

  saveMilestoneProcent(value) {
    this.Item.completeness = value;
    this.milsestonesService.PatchMileston(this.Item)
      .subscribe(
        (res) => {
        },
        (err) => {
        }
      );
    }

}
