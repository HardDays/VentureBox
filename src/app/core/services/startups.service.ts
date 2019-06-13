import { CompanyModel, InvestedModel } from './../models/company.model';
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

    GetAllCompanies(offset: number, limit: number, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/companies', this.type.ParamsToUrlSearchParams({offset, limit: limit ? limit : 10 })),
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


    GetCompanyImageUrl(startup_id: number, params?: any )
    {
        return this.http.GetQueryStr('/companies/' + startup_id + '/image', this.type.ParamsToUrlSearchParams(params));
    }

    InterestingCompany(CompanyId: number, success?: (ok) => void, fail?:(err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/companies/"+CompanyId+"/interesting_companies" , {}),
            success,
            fail
          );
    }

    InvestingCompany(CompanyId:number, invested: InvestedModel, success?: (ok) => void, fail?:(err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/companies/"+CompanyId+"/invested_companies" , invested),
            success,
            fail
          );
    }

    GetInvestedCompany(UserId:number, CompanyId:number, success?: (ok) => void, fail?:(err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData("/users/"+UserId+"/companies/"+CompanyId+"/investors" , ''),
            success,
            fail
          );
    }
}
