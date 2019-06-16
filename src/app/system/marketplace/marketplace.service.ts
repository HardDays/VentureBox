import { UserModel } from 'src/app/core/models/user.model';
import { HttpService } from 'src/app/core/services/http.service';
import { Injectable } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ProductModel } from '../../core/models/product.model';
import { Subject } from 'rxjs';
import { TypeService } from '../../core/services/type.service';


@Injectable()
export class MarketplaceService 
{
    Products: ProductModel[] = [];
    ProductsUpdated: Subject<boolean> = new Subject<boolean>();
    ProductsTotal: number = 0;
    ProductsLimitLoad = 6;
    constructor(private http: HttpService, private type: TypeService)
    {

    }

    RefreshProductList(Params?: any, callbackOk?: (res) => void, callbackFail?: (err) => void)
    {
        return this.http.CommonRequest(
            () => this.http.GetData(
                '/company_items.json', 
                this.type.ParamsToUrlSearchParams(Params)
            ),
            (result) => {
                let arr = this.Products;
                if(Params && Params.new)
                {
                        arr = [];
                }
                if(result)
                {
                    this.ProductsTotal = result.count ? result.count : 0;

                    if(result.items)
                    {
                        result.items.forEach((obj) => {
                            arr[obj.id] = obj;
                        });
                    }
                }

                this.Products = arr.filter(obj => obj != null);
                this.ProductsUpdated.next(true);
                if(callbackOk && typeof callbackOk == 'function')
                {
                    callbackOk(result);
                }
            },
            (error) => {
                if(callbackFail && typeof callbackFail == 'function')
                {
                    callbackFail(error);
                }
            }
        );
    }
}