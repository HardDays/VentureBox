import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ProductModel } from '../../../core/models/product.model';

@Component({
  selector: 'products-lists-cmp',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ProductsListsComponent implements OnInit {

    Products: ProductModel[] = [];

    constructor(private products: ProductsService) {
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