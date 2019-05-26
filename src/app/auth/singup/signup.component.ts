import { CompanyModel, TeamMember } from './../../core/models/company.model';
import { TypeService } from './../../core/services/type.service';
import { UserModel } from './../../core/models/user.model';
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

    ErrorsUser = {
      name: '',
      surname: '',
      email: '',
      password: '',
      password_confirmation: ''
    };

    Company: CompanyModel = new CompanyModel();

    StageOfFunding: {name: string, isSelected: boolean}[] = [
      {name : 'Idea', isSelected: false},
      {name : 'Pre-seed', isSelected: false},
      {name : 'Seed', isSelected: false},
      {name : 'Serial A', isSelected: false},
      {name : 'Serial B', isSelected: false},
      {name : 'Serial C', isSelected: false}
    ];
    isStageOfFundingOpened = false;
    Teams: TeamMember[] = [];
    TeamLevels = ['CTO', 'CFO', 'CIO', 'COO', 'CCO', 'CKO', 'CSO', 'CDO', 'CMO'];
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
    }

    TypeChange(Value) {
        this.Value = Value;
        this.User.role = Value;
    }

    NextStep() {
      this.RegisterUser( (user) => {
          this.Step = 2;
          this.auth.FormSizeBig.next(true);
          this.Company.user_id = user.id;
        }
      );
    }

    NavigateToLogin() {
      this.auth.FormSizeBig.next(false);
      this.Step = 1;
      this.router.navigate(['/auth', 'login']);
    }

    Register() {
      if (this.Step === 1) {
        this.RegisterUser( () => {
            this.NavigateToLogin();
          }
        );
      } else if (this.Step === 2) {
        this.RegisterCompany();
      }
    }

    RegisterUser ( callback: (any) => void) {
      this.auth.CreateUser(this.User)
        .subscribe(
          (res) => {
            console.log(res.json()); // token here
            this.auth.SetCurrentToken(res.json()['token']);
            callback(res.json());
          },
          (err) => {
            this.ErrorsUser = this.type.GetErrorsDictByResponse(err.json(), this.ErrorsUser);
          }
        );
    }

    RegisterCompany () {
      this.auth.CreateCompany(this.Company)
        .subscribe(
          (res) => {
            this.NavigateToLogin();
          },
          (err) => {
            console.log(err.json());
             this.ErrorsCompany = this.type.GetErrorsDictByResponse(err.json(), this.ErrorsCompany);
          }
        );
    }

    addTeamMember() {
      this.Teams.push(new TeamMember());
    }

    deleteTeamItem(index: number) {
      this.Teams.splice(index, 1);
    }

    uploadImage($event) {
      const paths = $event.srcElement.value.split("\\");
      const path = paths[paths.length-1];
    this.type.ReadImages(
        $event.target.files,
        (res: string) => {
            this.Company.image = res;
            this.ImagePath = path;
        }
    );
  }


}
