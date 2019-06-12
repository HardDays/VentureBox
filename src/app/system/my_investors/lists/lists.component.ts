import { StartupsService } from './../../../core/services/startups.service';
import { InvestedModel } from './../../../core/models/company.model';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-investors-lists-cmp',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class MyInvestorsListsComponent implements OnInit {

    Items: InvestedModel[] = [];

    constructor(
      private auth: AuthService,
      private Service: StartupsService) {
    }

    ngOnInit() {

      this.getList();

      this.auth.onMeChange$.subscribe(
        (res) => { this.getList(); }
      );
    }

    getList () {
      if (this.auth.Me){
        this.Service.GetInvestedCompany(
          this.auth.Me.id,
          this.auth.Me.company_id,
            (res) => {
              this.Items = res['items'];
            }
          );
      }
    }

    getInitials (name: string) {
      if (name && name.length) {
        let nameDetails = name.split(' ');
        let initials = '';
        if(nameDetails.length)
        for (let item of nameDetails) {
          initials += item.slice(0, 1).toUpperCase();
        }
        return initials;
      }
      return '';
    }



}
