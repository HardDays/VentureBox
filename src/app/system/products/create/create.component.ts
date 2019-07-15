import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/core/models/product.model';
import { Validator } from '../../../core/base/field.validator';
import { ProductCreateModel } from 'src/app/core/models/product-create.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { IDictionary } from '../../../core/interfaces/dictionary.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-create-cmp',
  templateUrl: './../edit/edit.component.html',
  styleUrls: ['./../edit/edit.component.css']
})
export class ProductsCreateComponent implements OnInit {

  Mode = 'create';
  Product = new ProductCreateModel();
  Errors: IDictionary = {} as IDictionary;
  ErrorMsgs: IDictionary = {} as IDictionary;

  IsTagsOpened = false;
  Tags: any[] = [];
  constructor(private _location: Location, private auth: AuthService, private productsService: ProductsService, private router: Router) 
  {
    this.productsService.TagsUpdated.subscribe((val) => {
      if(val){
        this.UpdateTagsList();
      }
    });

    

  }

  ngOnInit() 
  {
    this.UpdateTagsList();
  }

  GoBack()
  {
      this._location.back();
  }

  Save()
  {
    if(!this.Validate())
    {
      return;
    }

    this.Product.tags = [];
    for(const item of this.Tags)
    {
      if(item.isSelected)
        this.Product.tags.push(item.value);
    }

    this.productsService.CreateProduct(this.Product,
      (res) => {
        this.router.navigate(['/system', 'my_products']);
      },
      (err) => {
        this.Validate();
        if(err && err.body)
        {
          if(err.body.shopify)
          {
            this.ErrorMsgs['shopify'] = err.body.shopify[0];
          }
        }
      })

  }

  Validate()
  {
    const errors = this.productsService.ValidateProductCreateModel(this.Product);
    if(errors !== 1)
    {
      this.Errors = errors;
    }
    else
    {
      this.Errors = {} as IDictionary;
    }

    if(Object.keys(this.Errors).length > 0)
    {
      this.ParseErrors();
      return false;
    }

    return true;
  }

  ParseErrors()
  {
    this.ErrorMsgs = {} as IDictionary;
    for(const i in this.Errors)
    {
      this.ErrorMsgs[i] = this.productsService.GetFieldError(i, this.Errors[i]);
    }
  }

  ReadImage($event:any)
  {
    console.log($event);
    if(!$event.target.files[0])
    {
      this.Product.image = null;
      return;
    }
    const f: File = $event.target.files[0];
    if(!f)
      return;

    const reader:FileReader = new FileReader();
    reader.onload = (e) => {
      this.Product.image = reader.result.toString();
    }

    reader.readAsDataURL(f);
  }

  UpdateTagsList()
  {
    this.Tags = [];
    for(const i in this.productsService.Tags)
    {
      this.Tags.push({name: this.productsService.Tags[i], value: i, isSelected: false});
    }
  }
}
