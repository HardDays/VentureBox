import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeService } from 'src/app/core/services/type.service';
import { ProductModel } from 'src/app/core/models/product.model';

import {Location} from '@angular/common';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';

@Component({
  selector: 'app-product-detail-cmp',
  templateUrl: './product_detail.component.html',
  styleUrls: ['./product_detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    Product = new ProductModel();
    ProductId:number = 0;

    ImageUrl:string = 'assets/img/logo-product.jpg';
    Tags = {} as IDictionary;
    constructor(private _location: Location, private auth: AuthService,
        private productsService: ProductsService, private router: Router,
        private route: ActivatedRoute, private typeService: TypeService) 
    {
        
        this.route.params.subscribe(params=> {
            if(params && params['id'])
            {
                this.ProductId = params['id'];
            }
        });

        this.productsService.TagsUpdated.subscribe((val) => {
        if(val){
            this.UpdateTagsList();
        }
        });
    }

    ngOnInit() 
    {
        this.UpdateTagsList();
        this.InitProductModel();
    }

  InitProductModel()
  {
    this.Product = this.productsService.GetProductModelById(this.ProductId);

    if(!this.Product.id || this.Product.id != this.ProductId)
    {
      this.productsService.GetProductInfo(this.ProductId,
        (res) => {
          this.Product = res;
          this.InitAll();
        });
      return;
    }

    this.InitAll();
  }

  InitAll()
  {
      if(this.Product && this.Product.id && this.Product.id == this.ProductId)
      {
        if(this.Product.has_image)
        {
            this.ImageUrl = this.productsService.GetProductImageUrl(this.ProductId, {width: 300, height:180});
        }
      }
      else{
        this.router.navigate(['/system']);
      }
  }


  GoBack()
  {
      this._location.back();
  }

  UpdateTagsList()
    {
        this.Tags = {} as IDictionary;
        for(const i in this.productsService.Tags)
        {
            this.Tags[i] = this.productsService.Tags[i];
        }
    };

    NavigateTo()
    {
        
    }



}