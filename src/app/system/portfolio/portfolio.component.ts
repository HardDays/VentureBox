import { CompanyInPortfolioModel } from './../../core/models/company-in-portfolio.model';
import { StartupsService } from './../../core/services/startups.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeService } from 'src/app/core/services/type.service';
import { ProductModel } from 'src/app/core/models/product.model';

import {Location} from '@angular/common';
import { UserModel } from '../../core/models/user.model';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Validator } from '../../core/base/field.validator';
import { InvestedModel } from 'src/app/core/models/company.model';

@Component({
  selector: 'app-portfolio-cmp',
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {

    Me: UserModel = new UserModel();

    Invested: CompanyInPortfolioModel[] = [];
    Intresting: CompanyInPortfolioModel[] = [];

    isShowAllInteresting = false;
    isShowAllInvested = false;

    InvestedCount = 0;
    IntrestingCount = 0;

    isModalOpened = false;
    InvestedCompanyID = 0;
    InvestedInfo = new InvestedModel();

    public mask = [/[1-9]/, /[0-9]/];

    Errors = {
      investment: '',
      evaluation: '',
      email: ''
    };

    constructor(
        private auth: AuthService,
        private startupsService: StartupsService,
        private typeService: TypeService)
    {
        this.auth.onMeChange$.subscribe((me: UserModel) => {
            this.Me = me;
        });
    }

    ngOnInit()
    {
        this.Me = this.auth.Me;
        this.GetData();
    }

    GetData()
    {
        this.GetInteresting();
        this.GetInvested();
    }

    GetInteresting() {
      this.startupsService.GetPortfolioIntresting(
        {
          limit: 0,
          offset: 0
        },
        (res) => {
          this.IntrestingCount = res.count;
          this.Intresting = res.items;
          this.getImages(this.Intresting);
          console.log(this.IntrestingCount, this.Intresting.length);
        }
      );
    }

    GetInvested() {
      this.startupsService.GetPortfolioInvested(
        {
          limit: 0,
          offset: 0
        },
        (res) => {
          this.InvestedCount = res.count;
          this.Invested = res.items;
          this.getImages(this.Invested);
          console.log(this.InvestedCount, this.Invested.length);
        }
      );
    }

  getImages(array:CompanyInPortfolioModel[]) {
    for (let item of array) {
      item.image = this.startupsService.GetCompanyImageUrl(item.company_id);
    }
  }


  openModalInvest(idStartup:number) {
      this.isModalOpened = true;
      this.InvestedCompanyID = idStartup;
    }

    InvestToCompany () {

      if (!this.InvestedInfo.contact_email || !Validator.ValidateEmail(this.InvestedInfo.contact_email)) {
        this.Errors.email = 'Email is incorrect';
        return;
      }
      this.Errors.email = '';

      this.startupsService.InvestingCompany(
        this.InvestedCompanyID,
        this.InvestedInfo,
        (res) => {
          this.Intresting.splice(this.Intresting.findIndex(x => x.id === this.InvestedCompanyID), 1);
          this.GetInvested();
          this.isModalOpened = false;
          this.InvestedInfo = new InvestedModel();
          this.Errors = {
            investment: '',
            evaluation: '',
            email: ''
          };
        }, (err) => {
          console.log(err);
           this.Errors = this.typeService.GetErrorsDictByResponse(err.json(), this.Errors);
        });
    }

    UnInterestingCompany (id: number) {
      this.startupsService.UnInterestingCompany(
        id,
        (res) => {
          this.Intresting.splice(this.Intresting.findIndex(x => x.id === id), 1);
        });
    }





}
