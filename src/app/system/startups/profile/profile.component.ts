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
import { CompanyModel } from 'src/app/core/models/company.model';
import { StartupsService } from 'src/app/core/services/startups.service';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-startups-profile-cmp',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class StartupsProfileComponent implements OnInit {

  Mode = 'Profile';

  StartupId = 0;
  Startup = new CompanyModel();
  Products: ProductModel[] = [];
  Image: any;
  News: NewsModel[] = [];

  constructor(private _location: Location, private auth: AuthService,
    private startupsService: StartupsService, private router: Router,
    private route: ActivatedRoute, private typeService: TypeService,
    private productsService: ProductsService, private newsService: NewsService)
  {

    this.route.params.subscribe(params => {
      if(params && params['id']) {
        this.StartupId = params['id'];
        this.GetStartupById(this.StartupId);
      }
    });

  }

  ngOnInit() {
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


}
