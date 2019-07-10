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
import { IMyDpOptions } from 'mydatepicker';

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
    isModalSuccess = false;
    InvestedCompanyID = 0;
    InvestedInfo = new InvestedModel();

    public mask = [/[1-9]/, /[0-9]/];

    Errors = {
      investment: '',
      evaluation: '',
      email: '',
      contact_email: '',
      date_from: '',
      date_to: ''
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
        }
      );
    }

  getImages(array:CompanyInPortfolioModel[]) {
    for (let item of array) {
      if(item.company_has_image)
        item.image = this.startupsService.GetCompanyImageUrl(item.company_id, {width: 480, height: 280});
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

      if (this.InvestedInfo.investment) {
        this.InvestedInfo.investment = this.InvestedInfo.investment.replace(',', '.').split(' ').join('');
      }

      this.startupsService.InvestingCompany(
        this.InvestedCompanyID,
        this.InvestedInfo,
        (res) => {
          this.GetInteresting();
          this.GetInvested();
          this.isModalOpened = false;
          this.isModalSuccess = true;
          this.InvestedInfo = new InvestedModel();
          this.Errors = {
            investment: '',
            evaluation: '',
            email: '',
            contact_email: '',
            date_from: '',
            date_to: ''
          };
        }, (err) => {
           this.Errors = this.typeService.GetErrorsDictByResponse(err.json(), this.Errors);
        });
    }

    UnInterestingCompany (id: number) {
      this.startupsService.UnInterestingCompany(
        id,
        (res) => {
          const index = this.Intresting.findIndex(x => x.company_id === id);
          this.Intresting.splice(index, 1);
          this.IntrestingCount--;
        });
    }

    closeInvestedModal () {
      this.isModalOpened = false;
      this.InvestedInfo = new InvestedModel();
      this.Errors = {
              investment: '',
              evaluation: '',
              email: '',
              contact_email: '',
              date_from: '',
              date_to: ''
            };
    }

    IsShowFrom = false;
    IsShowTo = false;
    Today = new Date();
    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy-mm-dd',
        inline: true,
        disableUntil: {year: this.Today.getFullYear(), month: this.Today.getMonth() + 1, day: this.Today.getDate() - 1}
    };
    onDateFromChanged(event) {
      this.InvestedInfo.date_from = event.formatted;
      this.IsShowFrom = false;
    }
    onDateToChanged(event) {
      this.InvestedInfo.date_to = event.formatted;
      this.IsShowTo = false;
    }





}
