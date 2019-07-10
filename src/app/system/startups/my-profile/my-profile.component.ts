import { StartupsService } from './../../../core/services/startups.service';
import { CompanyModel, InvestedModel } from './../../../core/models/company.model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/core/models/product.model';
import { ProductCreateModel } from 'src/app/core/models/product-create.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { IDictionary } from '../../../core/interfaces/dictionary.interface';
import { Router } from '@angular/router';
import { NewsModel } from 'src/app/core/models/news.model';
import { NewsService } from 'src/app/core/services/news.service';
import { IMyDpOptions } from 'mydatepicker';


@Component({
  selector: 'app-startups-my-profile-cmp',
  templateUrl: '../profile/profile.component.html',
  styleUrls: ['../profile/profile.component.css']
})
export class StartupsMyProfileComponent implements OnInit {

  Mode = 'MyProfile';
  Me = this.auth.Me;
  StartupId = 0;
  Startup = new CompanyModel();

  Products: ProductModel[] = [];
  News: NewsModel[] = [];

  isModalOpened = false;
  isModalSuccess = false;
    InvestedCompanyID = 0;
    InvestedInfo = new InvestedModel();
    public mask = [/[1-9]/, /[0-9]/];

    ErrorsInvest = {
      investment: '',
      evaluation: '',
      email: '',
      contact_email: '',
      date_from: '',
      date_to: ''
    };

  constructor(private _location: Location,
    private auth: AuthService,
    private startupsService: StartupsService,
    private router: Router,
    private productsService: ProductsService,
    private newsService: NewsService)
  {
  }

  ngOnInit()
  {
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

  GoBack()
  {
      this._location.back();
  }

  GetMyStartup() {
    this.startupsService.GetCompanyInfo(
      this.auth.Me.company_id,
      (res) => {
        this.Startup = res;
        this.GetImage();
        this.GetMyProducts();
        this.GetMyNews();
      }
    );
  }

  GetMyProducts() {
    this.productsService.GetProductsListByCompanyId(
      this.StartupId,
      (res) => {
        this.Products = res.items;
        for(let item of this.Products) {
          if(item.has_image)
            item.image = this.productsService.GetProductImageUrl(item.id, {width: 480, height: 280});
        }
      }
    );
  }

  GetMyNews() {
    this.newsService.GetStartupNewsByCompanyId(this.StartupId)
      .subscribe(
        (res) => {
          this.News = res.json()['items'];
        }
      );
  }

  GetImage() {
    if (this.Startup.has_image) {
      this.Startup.image = this.startupsService.GetCompanyImageUrl(this.StartupId, {width: 480, height: 280});
    }
  }


  openModalInvest(idStartup:number) {
  }

  InvestToCompany () {
  }

  InterestingCompany (id: number) {
  }

  NotInterestedCompany (id: number) {
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
