import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductModel } from '../../../core/models/product.model';

@Component({
  selector: 'app-products-edit-cmp',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ProductsEditComponent implements OnInit {

    Mode = 'edit';
    Product = new ProductModel();
    productForm: FormGroup = new FormGroup({
      'email' : new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')
      ])
    });
    constructor(private _location: Location) {
    }

    ngOnInit()
    {

    }

    GoBack()
    {
        this._location.back();
    }

    Save()
    {
      if(!this.productForm.invalid)
      {
        //save
      }
      else{
        //errors
      }
    }
}
