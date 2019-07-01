import { Validator } from './../../../core/base/field.validator';
import { TypeService } from 'src/app/core/services/type.service';
import { StartupsService } from './../../../core/services/startups.service';
import { CompanyModel, InvestedModel } from './../../../core/models/company.model';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ProductModel } from '../../../core/models/product.model';
import { AuthService } from '../../../core/services/auth.service';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';

@Component({
  selector: 'startups-lists-cmp',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class StartupsListsComponent implements OnInit {

    Startups: CompanyModel[] = [];
    isModalOpened = false;
    InvestedCompanyID = 0;
    InvestedInfo = new InvestedModel();
    ScrollDisabled = false;

    ItemsCount = 0;

    isModalSuccess = false;

    public mask = [/[1-9]/, /[0-9]/];

    constructor(private startupsService: StartupsService, private auth: AuthService, private type: TypeService)
    {

    }

    Errors = {
      investment: '',
      evaluation: '',
      email: '',
      contact_email: ''
    };

    ngOnInit() {
      this.GetList();
    }

    GetList() {
      if (this.ItemsCount >= this.Startups.length) {
        this.startupsService.GetAllCompanies(
          this.Startups.length,
          12,
          (res) => {
            this.ItemsCount = res.count;
            if (res.items.length) {
              const oldSize = this.Startups.length;
              this.Startups.push(...res.items);
              this.GetImages(oldSize);
              this.ScrollDisabled = false;
            }
          }
        );
      } else {
        this.ScrollDisabled = true;
      }
    }

    GetImages (offset = 0) {
      for (let i = offset; i < this.Startups.length; i++) {
        if (this.Startups[i].has_image ) {
          this.Startups[i].image = this.startupsService.GetCompanyImageUrl(this.Startups[i].id, {width: 200, height: 100});
        }
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
          this.isModalOpened = false;
          this.isModalSuccess = true;
          this.InvestedInfo = new InvestedModel();
          this.Errors = {
            investment: '',
            evaluation: '',
            email: '',
            contact_email: ''
          };
          this.Startups.find(x => x.id === this.InvestedCompanyID).is_invested = true;
        }, (err) => {
           this.Errors = this.type.GetErrorsDictByResponse(err.json(), this.Errors);
        });
    }

    InterestingCompany (id: number) {
      this.startupsService.InterestingCompany(
        id,
        (res) => {
          this.Startups.find(x => x.id === id).is_interested = true;
        });
    }

    NotInterestedCompany(id: number) {
      this.startupsService.UnInterestingCompany(
        id,
        (res) => {
          this.Startups.find(x => x.id === id).is_interested = false;
        });
    }

  onScroll() {
    this.ScrollDisabled = true;
    this.GetList();
  }

  closeInvestedModal () {
    this.isModalOpened = false;
    this.InvestedInfo = new InvestedModel();
    this.Errors = {
            investment: '',
            evaluation: '',
            email: '',
            contact_email: ''
          };
  }



}
