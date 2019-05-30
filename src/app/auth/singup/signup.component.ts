import { CompanyModel } from './../../core/models/company.model';
import { TypeService } from './../../core/services/type.service';
import { UserModel, TeamMember } from './../../core/models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'signup-cmp',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

    Step = 1;

    User: UserModel = new UserModel();
    Value = this.User.role;

    ErrorsUserPage1 = {
      name: '',
      surname: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
    ErrorsUserPage2 = {
      company_name: '',
      website: '',
      description: '',
      contact_email: '',
      stage_of_funding: '',
      c_level: '',
      team_member_name: ''
    };

    Company: CompanyModel = new CompanyModel();

    StageOfFunding: {name: string, value: string, isSelected: boolean}[] = [];
    isStageOfFundingOpened = false;
    TeamLevels: {name: string, value: string, isSelected: boolean}[] = [];
    ImagePath = '';

    ErrorsCompany = {
      name: '',
      website: '',
      description: '',
      contact_email: ''
    };


    constructor(private auth: AuthService, private type: TypeService,
            private router: Router
        ) {
        this.auth.FormSizeBig.next(true);
    }

    ngOnInit() {
        this.auth.FormSizeBig.next(true);
        this.addTeamMember();

        this.InitTypes();
    }

    InitTypes() {
      this.type.GetEnumStageOfFunding()
        .subscribe(
          (res) => {
            this.StageOfFunding =  [];
            const arr = res.json();
            for (let key in arr) {
              this.StageOfFunding.push({name: arr[key], value: key, isSelected: false});
            }
          }
        );

      this.type.GetEnumClevels()
        .subscribe(
          (res) => {
            this.TeamLevels =  [];
            const arr = res.json();
            for (let key in arr) {
              this.TeamLevels.push({name: arr[key], value: key, isSelected: false});
            }
          }
        );
    }

    setStageOfFunding(item) {
      for (let item of this.StageOfFunding) {
        item.isSelected = false;
      }
      this.StageOfFunding.find(x=>x.name == item.name).isSelected = true;
    }

    setClevel(item) {
      for (let item of this.TeamLevels) {
        item.isSelected = false;
      }
      this.TeamLevels.find(x=>x.name == item.name).isSelected = true;
    }

    TypeChange(Value) {
        this.Value = Value;
        this.User.role = Value;
    }

    NextStep() {
      this.Step = 2;
          this.auth.FormSizeBig.next(true);

    }

    NavigateToLogin() {
      this.auth.FormSizeBig.next(false);
      this.Step = 1;
      this.router.navigate(['/auth', 'login']);
    }

    Register() {
      if (this.User.role === 'startup') {
        const tmp = this.StageOfFunding.find(x => x.isSelected === true);
        this.User.stage_of_funding = tmp ? tmp.value : '';
      }
      this.RegisterUser();
    }

    RegisterUser () {
      this.auth.CreateUser(this.User)
        .subscribe(
          (res) => {
            // console.log(res.json()); // token here
            this.auth.SetCurrentToken(res.json()['token']);
            this.auth.TryToLoginWithToken();
            this.router.navigate(['/system']);
          },
          (err) => {
            this.ErrorsUserPage1 = this.type.GetErrorsDictByResponse(err.json(), this.ErrorsUserPage1);
            this.ErrorsUserPage2 = this.type.GetErrorsDictByResponse(err.json(), this.ErrorsUserPage2);
            for (let key in this.ErrorsUserPage1) {
              if (this.ErrorsUserPage1[key] !== '') {
                this.Step = 1;
              }
            }
          }
        );
    }

    addTeamMember() {
      this.User.team_members.push(new TeamMember());
    }

    deleteTeamItem(index: number) {
       this.User.team_members.splice(index, 1);
    }

    uploadImage($event) {
      const paths = $event.srcElement.value.split("\\");
      const path = paths[paths.length-1];
      this.type.ReadImages(
          $event.target.files,
          (res: string) => {
              this.User.image = res;
              this.ImagePath = path;
          }
      );
  }


}