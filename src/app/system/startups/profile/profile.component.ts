import { NewsModel } from './../../../core/models/news.model';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductModel } from '../../../core/models/product.model';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { ProductCreateModel } from 'src/app/core/models/product-create.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeService } from 'src/app/core/services/type.service';
import { CompanyModel, InvestedModel } from 'src/app/core/models/company.model';
import { StartupsService } from 'src/app/core/services/startups.service';
import { NewsService } from 'src/app/core/services/news.service';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-startups-profile-cmp',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class StartupsProfileComponent implements OnInit {

  Mode = 'Profile';
  Me = this.auth.Me;

  StartupId = 0;
  Startup = new CompanyModel();
  Products: ProductModel[] = [];
  Image: any;
  News: NewsModel[] = [];

  isModalOpened = false;

  ErrorsInvest = {
    investment: '',
    evaluation: '',
    email: '',
    contact_email: '',
    date_from: '',
    date_to: ''
  };

  isModalSuccess = false;
  InvestedCompanyID = 0;
  InvestedInfo = new InvestedModel();
  public mask = [/[1-9]/, /[0-9]/];

  StageOfFunding: {name: string, value: string}[] = [];
  TeamLevels: {name: string, value: string}[] = [];

  constructor(private _location: Location, private auth: AuthService,
    private startupsService: StartupsService, private router: Router,
    private route: ActivatedRoute, private typeService: TypeService,
    private productsService: ProductsService, private newsService: NewsService, private type: TypeService)
  {

    this.route.params.subscribe(params => {
      if (params && params['id']) {
        this.StartupId = params['id'];
        if (this.Me && this.StartupId == this.Me.company_id) {
          this.router.navigate(['/system', 'startups', 'my-profile']);
        }
        this.GetStartupById(this.StartupId);
      }
    });

  }

  ngOnInit() {
    this.InitTypes();
  }


  InitTypes() {
      this.type.GetEnumStageOfFunding()
        .subscribe(
          (res) => {
            this.StageOfFunding =  [];
            const arr = res.json();
            for (let key in arr) {
              this.StageOfFunding.push({name: arr[key], value: key});
            }
          }
        );

      this.type.GetEnumClevels()
        .subscribe(
          (res) => {
            this.TeamLevels =  [];
            const arr = res.json();
            for (let key in arr) {
              this.TeamLevels.push({name: arr[key], value: key});
            }
          }
        );
    }

  GoBack()
  {
      this._location.back();
  }

  GetStartupById(id: number) {
    this.startupsService.GetCompanyInfo(
      id,
      (res) => {
        this.Startup = res;
        this.GetImage();
        this.GetProducts();
        this.GetNews();
      }
    );
  }

  GetImage() {
    if (this.Startup.has_image) {
      this.Startup.image = this.startupsService.GetCompanyImageUrl(this.StartupId, {width: 480, height: 280});
    }
  }

  GetProducts() {
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

  GetNews () {
        this.newsService.GetStartupNewsByCompanyId(this.StartupId)
      .subscribe(
        (res) => {
          this.News = res.json()['items'];
        }
      );
  }



    openModalInvest(idStartup:number) {
      this.isModalOpened = true;
      this.InvestedCompanyID = idStartup;
    }

    InvestToCompany () {
      if (this.InvestedInfo.investment) {
        this.InvestedInfo.investment = this.InvestedInfo.investment.replace(',', '.').split(' ').join('');
      }
      this.startupsService.InvestingCompany(
        this.InvestedCompanyID,
        this.InvestedInfo,
        (res) => {
          this.isModalOpened = false;
          this.isModalSuccess = true;
        }, (err) => {
           this.ErrorsInvest = this.typeService.GetErrorsDictByResponse(err.json(), this.ErrorsInvest);
        });
    }

    InterestingCompany (id: number) {
      this.startupsService.InterestingCompany(
        id,
        (res) => {
          this.Startup.is_interested = true;
        });
    }

    NotInterestedCompany(id: number) {
      this.startupsService.UnInterestingCompany(
        id,
        (res) => {
          this.Startup.is_interested = false;
        });
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
