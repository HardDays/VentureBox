import { Router } from '@angular/router';
import { StartupsService } from 'src/app/core/services/startups.service';
import { TypeService } from './../../../core/services/type.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ProductModel } from '../../../core/models/product.model';
import { AuthService } from '../../../core/services/auth.service';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { UserModel, TeamMember } from 'src/app/core/models/user.model';
import { CompanyModel } from 'src/app/core/models/company.model';
import {Location} from '@angular/common';

@Component({
  selector: 'startups-edit-cmp',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class StartupsEditComponent implements OnInit {

    StartupId = 0;
    Company: CompanyModel = new CompanyModel();
    CompanyOld: CompanyModel = new CompanyModel();

    Errors = {
      company_name: '',
      website: '',
      description: '',
      contact_email: '',
      stage_of_funding: '',
      c_level: '',
      team_member_name: ''
    };

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

    constructor(
      private _location: Location,
      private products: ProductsService,
      private auth: AuthService,
      private type: TypeService,
      private startupsService: StartupsService,
      private router: Router
     )
    {
    }

    ngOnInit() {
      this.InitTypes();

      if (this.auth.Me) {
        this.StartupId = this.auth.Me.company_id;
        this.GetMyStartup();
      } else {
        this.auth.onMeChange$.subscribe(
          (res) => {
            this.StartupId = this.auth.Me.company_id;
            this.GetMyStartup();
          }
        );
      }
    }



  GetMyStartup() {
    this.startupsService.GetCompanyInfo(
      this.auth.Me.company_id,
      (res) => {
        this.CompanyOld = res;

        if (this.CompanyOld.has_image) {
          this.ImagePath = 'Company image.png';
        }

        if(this.StageOfFunding.length)
          this.StageOfFunding.find(x => x.value === this.CompanyOld.stage_of_funding).isSelected = true;

        if (this.TeamLevels.length){
          for (let member of this.CompanyOld.team_members) {
            member.c_level_name = this.TeamLevels.find(x=>x.value === member.c_level).name;
          }
        }

        this.Company = this.getCompanyFromModel(this.CompanyOld);
      }
    );
  }

  getCompanyFromModel(company: CompanyModel) {
    let cmodel = new CompanyModel();
    for (let i in company) {
      cmodel[i] = company[i];
    }
    cmodel.team_members = [];
    for(let item of company.team_members)
      cmodel.team_members.push(item);

    if (this.StageOfFunding.length) {
      this.StageOfFunding.forEach(x => x.isSelected = false);
      this.StageOfFunding.find(x => x.value === cmodel.stage_of_funding).isSelected = true;
    }
    return cmodel;
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

            if(this.CompanyOld.id)
              this.StageOfFunding.find(x => x.value === this.CompanyOld.stage_of_funding).isSelected = true;
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
            if (this.CompanyOld.id){
              for(let member of this.CompanyOld.team_members) {
                member.c_level_name = this.TeamLevels.find(x=>x.value === member.c_level).name;
              }
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

    addTeamMember() {
      this.Company.team_members.push({team_member_name:'', c_level:'ceo', c_level_name:'CEO'});
    }

    deleteTeamItem(index: number) {
       this.Company.team_members.splice(index, 1);
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

  Save() {

      const tmp = this.StageOfFunding.find(x => x.isSelected === true);
      this.Company.stage_of_funding = tmp ? tmp.value : '';
      if (!this.Company.stage_of_funding) {
        this.Errors.stage_of_funding = 'Stage of funding can\'t be blank.';
        return;
      } else {
        this.Errors.stage_of_funding = '';
      }

      if (this.Company.has_image && !this.Company.image) {
        delete this.Company.image;
      }

      this.PatchCompany();
    }

    PatchCompany () {
      this.startupsService.PatchCompany(this.StartupId, this.Company,
          (res) => {
            this.CompanyOld = res;
            this.router.navigate(['/system','startups','my-profile'])
          },
          (err) => {
            this.Errors = this.type.GetErrorsDictByResponse(err.json(), this.Errors);
          }
        );
    }

    GoBack() {
        this._location.back();
    }

    Cancel() {
      // this.Company = this.getCompanyFromModel(this.CompanyOld);
      this.GoBack();
    }

    public mask = [/[1-9]/, /[0-9]/];





}
