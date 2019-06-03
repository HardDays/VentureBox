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

@Component({
  selector: 'app-products-edit-cmp',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ProductsEditComponent implements OnInit {

  Mode = 'edit';
  Product = new ProductCreateModel();
  OldProduct = new ProductModel();
  ProductId:number = 0;
  Errors: IDictionary = {} as IDictionary;
  ErrorMsgs: IDictionary = {} as IDictionary;

  IsTagsOpened = false;
  Tags: any[] = [];
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
    // console.log('on init', this.ProductId);
    this.UpdateTagsList();
    
    this.InitProductModel();
  }

  InitProductModel()
  {
    this.OldProduct = this.productsService.GetProductModelById(this.ProductId);

    if(!this.OldProduct.id || this.OldProduct.id != this.ProductId)
    {
      this.productsService.GetProductInfo(this.ProductId,
        (res) => {
          this.OldProduct = res;
          this.InitAll();
        });
      return;
    }

    this.InitAll();
  }

  InitAll()
  {
    this.Product = ProductCreateModel.ProductCreateModelFromProductModel(this.OldProduct);
    this.InitTags();
    this.InitImage();
  }

  InitTags()
  {
    if(this.OldProduct.id && this.OldProduct.id == this.ProductId)
    {
      this.OldProduct.tags.forEach(
        val => {
          const index = this.Tags.findIndex(obj => obj.value == val);
          if(index > -1)
          {
            this.Tags[index].isSelected = true;
          }
        }
      )
    }
  }

  async InitImage()
  {
    if(this.OldProduct.id && this.OldProduct.id == this.ProductId && this.OldProduct.has_image)
    {
      const url = this.productsService.GetProductImageUrl(this.ProductId);

      this.typeService.LoadImageFromUrl(url)
        .then(
          (result: string) => {
            this.Product.image = result;
          }
        )
        .catch(
          err => {
            this.Product.image = '';
          }
        )

    }
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

    this.productsService.UpdateProduct(this.ProductId, this.Product,
      (res) => {
        this.router.navigate(['/system', 'my_products']);
      },
      (err) => {
        this.Validate();
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

    this.InitTags();
  }
}
