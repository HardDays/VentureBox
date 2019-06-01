import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { ProductModel } from '../models/product.model';
import { Subject } from 'rxjs';

@Injectable()
export class ProductsService {

    Page = 0;
    Size = 6;

    Products: ProductModel[] = [];
    Count: number = 0;

    onProductsChange: Subject<boolean> = new Subject<boolean>();
    constructor(private http: HttpService, private auth:AuthService) 
    {
    }

    GetProducts()
    {
        return this.Products;
    }

    GetProductModelById(Id:number)
    {
        for(let item of this.Products)
        {
            if(item.id == Id)
                return item;
        }
        return new ProductModel();
    }

    RefreshMyProducts()
    {
        this.http.CommonRequest(
            () => this.http.GetData("/users/" + this.auth.Me.id + "/companies/" + this.auth.Me.company_id + "/company_items.json"),
            (res) => {

                this.Products = res.items;
                this.Count = res.count;

                this.onProductsChange.next(true);
            }
        );
    }


}