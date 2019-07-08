import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MarketplaceService } from './marketplace.service';
import { ProductModel } from 'src/app/core/models/product.model';
import { ProductsService } from '../../core/services/products.service';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-marketplace-cmp',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
    URL:any = "";
    /*Products: ProductModel[] = [];
    ProductsTotal: number = 0;
    ScrollDisabled = false;

    Tags: IDictionary = {} as IDictionary;

    Categories: any[] = [];
    ShowCategories = false;
    SearchParams: any = {
        text: '',
        tags: [],
        limit: this.marketplaceService.ProductsLimitLoad,
        offset: 0
    };*/
    constructor(
            /*private marketplaceService: MarketplaceService, private productsService: ProductsService,*/
            private sanitizer: DomSanitizer
        )
    {
        this.URL = this.sanitizer.bypassSecurityTrustResourceUrl("https://marketplace.venture-box.com/collections/all");
        /*this.marketplaceService.ProductsUpdated.subscribe((val) => {
            if(val)
            {
              this.Products = this.marketplaceService.Products;
              this.ProductsTotal = this.marketplaceService.ProductsTotal;
              this.ScrollDisabled = this.ProductsTotal == this.Products.length;
            }
          });

        this.productsService.TagsUpdated.subscribe((val) => {
            this.UpdateCategories(this.productsService.Tags);
        });*/
    }
    ngOnInit(): void 
    {
        /*this.RefreshProductsList({limit: this.marketplaceService.ProductsLimitLoad, offset: 0, new: true});
        this.UpdateCategories(this.productsService.Tags);*/
    }

    RefreshProductsList(Params: any)
    {
        /*this.marketplaceService.RefreshProductList(Params, 
            (res) => {
            },
            (err) => {
            }
        )*/
    }

    /*onScroll($event) 
    {
        
        if(this.Products.length < this.ProductsTotal)
        {
            let params = JSON.parse(JSON.stringify(this.SearchParams));
            params.limit = this.marketplaceService.ProductsLimitLoad;
            params.offset = this.Products.length;
            this.RefreshProductsList(params);
        }
    }

    UpdateCategories(Arr: IDictionary)
    {
        let arr = [];
        for(const i in Arr)
        {
            arr.push({
                value: i,
                name: Arr[i],
                checked: false
            });
        }
        this.Categories = arr;
    }

    OnSearch()
    {
        this.SearchParams.tags = [];
        for(const item of this.Categories)
        {
            if(item.checked)
            {
                this.SearchParams.tags.push(item.value);    
            }
        }

        let params = JSON.parse(JSON.stringify(this.SearchParams));
        params.new = true;

        this.RefreshProductsList(params);
           

    }*/

}