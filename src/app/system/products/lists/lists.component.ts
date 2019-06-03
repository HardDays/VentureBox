import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ProductModel } from '../../../core/models/product.model';
import { AuthService } from '../../../core/services/auth.service';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';

@Component({
  selector: 'products-lists-cmp',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ProductsListsComponent implements OnInit {

    Products: ProductModel[] = [];

    constructor(private products: ProductsService, private auth: AuthService) 
    {
      this.auth.onMyCompanyChange$.subscribe((val) => {
        if (val){
          this.products.RefreshMyProducts();
        }
      })
      this.products.onProductsChange.subscribe(
        (val) => {
          if(val)
          {
            this.Products = this.products.GetProducts();
          }
        }
      )
    }

    ngOnInit() {
      this.products.RefreshMyProducts();
    }



}