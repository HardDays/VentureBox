import { CompanyModel } from './../models/company.model';
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
export class StartupsService {

    constructor(private http: HttpService, private auth:AuthService, private type: TypeService)
    {
    }

    GetAllCompanies(success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/companies'),
            success,
            fail
        );
    }

    GetCompanyInfo(Id, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/companies/' + Id ),
            success,
            fail
        );
    }

    PatchCompany(CompanyId: number, Company: CompanyModel, success?: (ok) => void, fail?:(err) => void)
    {
        if(this.auth.Me && this.auth.Me.id && this.auth.Me.company_id)
        {
            this.http.CommonRequest(
                () => this.http.PatchData("/users/" + this.auth.Me.id + "/companies/" + this.auth.Me.company_id , Company),
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

        if(!Validator.ValidateUrl(product.link_to_store))
        {
            validate['link_to_store'] = 'invalid';
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


    GetCompanyImageUrl(startup_id: number, params?: any )
    {
        return this.http.GetQueryStr('/companies/' + startup_id + '/image', this.type.ParamsToUrlSearchParams(params));
    }

}
