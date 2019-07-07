import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { ProductModel } from '../models/product.model';
import { Subject } from 'rxjs';
import { ProductCreateModel } from '../models/product-create.model';
import { IDictionary } from '../interfaces/dictionary.interface';
import { Validator } from '../base/field.validator';
import { TypeService } from './type.service';

export enum ProductCreateFields
{
    image = 'Product image',
    name = 'Product name',
    price = 'Price',
    link_to_store = 'Product link',
    product_type = 'Product type',
    description = 'Product description'
}

export enum FiledsErrorText
{
    empty = 'shuld not be empty!',
    long = 'is to long!',
    negative = 'should be a positive number!',
    nan = 'should be a valid number!',
    invalid = 'is invalid!'

};

@Injectable()
export class ProductsService {

    Page = 0;
    Size = 6;

    Products: ProductModel[] = [];
    Count: number = 0;

    Tags: IDictionary = {} as IDictionary;
    TagsUpdated: Subject<boolean> = new Subject<boolean>();

    onProductsChange: Subject<boolean> = new Subject<boolean>();
    constructor(private http: HttpService, private auth:AuthService, private type: TypeService)
    {
        this.RefreshTags();
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
        this.Products = [];
        this.Count = 0;
        if(this.auth.Me && this.auth.Me.id && this.auth.Me.company_id)
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

    GetProductInfo(Id, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/company_items/' + Id + '.json'),
            success,
            fail
        );
    }

    CreateProduct(Product: ProductCreateModel, success?: (ok) => void, fail?:(err) => void)
    {
        if(this.auth.Me && this.auth.Me.id && this.auth.Me.company_id)
        {
            this.http.CommonRequest(
                () => this.http.PostData("/users/" + this.auth.Me.id + "/companies/" + this.auth.Me.company_id + "/company_items.json", Product),
                success,
                fail
              )
        }
    }

    UpdateProduct(ProductId:number, Product: ProductCreateModel, success?: (ok) => void, fail?:(err) => void)
    {
        if(this.auth.Me && this.auth.Me.id && this.auth.Me.company_id)
        {
            this.http.CommonRequest(
                () => this.http.PatchData("/users/" + this.auth.Me.id + "/companies/" + this.auth.Me.company_id + "/company_items/" + ProductId + ".json", Product),
                success,
                fail
              )
        }
    }

    public ValidateProductCreateModel(product: ProductCreateModel)
    {
        const validate: IDictionary = {} as IDictionary;

        if(!product.image)
        {
            validate['image'] = 'empty';
        }

        if(!product.name)
        {
            validate['name'] = 'empty';
        }
        else if (product.name.length > 50)
        {
            validate['name'] = 'long';
        }

        if(!product.price)
        {
            validate['price'] = 'empty';
        }
        else if(product.price < 0)
        {
            validate['price'] = 'negative';
        }
        else if(Number.isNaN(product.price))
        {
            validate['price'] = 'nan';
        }

        if(!product.name)
        {
            validate['name'] = 'empty';
        }
        else if (product.name.length > 50)
        {
            validate['name'] = 'long';
        }

        if(!product.product_type)
        {
            validate['product_type'] = 'empty';
        }

        if(!product.description)
        {
            validate['description'] = 'empty';
        }
        else if(product.description.length > 10000)
        {
            validate['description'] = 'long';
        }

        return Object.keys(validate).length > 0 ? validate : 1;
    }

    public GetFieldError(field: string, error: string)
    {
        return ProductCreateFields[field] + ' ' + FiledsErrorText[error];
    }

    RefreshTags()
    {
        this.http.CommonRequest(
            () => this.http.GetData('/enums/tags.json'),
            (res) => {
                this.Tags = res;
                this.TagsUpdated.next(true);
            }
        );
    }

    GetProductImageUrl(product_id: number, params?: any )
    {
        return this.http.GetQueryStr('/company_items/'+product_id+'/image.json',this.type.ParamsToUrlSearchParams(params));
    }

    GetProductsListByCompanyId (CompanyId, success?: (ok) => void, fail?: (err) => void) {
      this.http.CommonRequest(
            () => this.http.GetData('/companies/' + CompanyId + '/company_items'),
            success,
            fail
        );
    }

}
