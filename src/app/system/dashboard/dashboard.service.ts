import { UserModel } from 'src/app/core/models/user.model';
import { HttpService } from 'src/app/core/services/http.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TypeService } from 'src/app/core/services/type.service';
import { NewsModel } from '../../core/models/news.model';


@Injectable()
export class DashboardService 
{
    CompanyDics = [];
    CompanyDicsUpdated: Subject<boolean> = new Subject<boolean>();
    Me:UserModel = new UserModel();
    MeChanged: Subject<UserModel>;

    News: NewsModel[] = [];
    NewsUpdated: Subject<boolean> = new Subject<boolean>();
    NewsTotal: number = 0;
    NewsLimitLoad = 3;
    constructor(private http: HttpService, private auth:AuthService, private type: TypeService)
    {
        this.Me = this.auth.Me;
        this.BaseInit();
        this.MeChanged = this.auth.onMeChange$;
        this.auth.onMeChange$.subscribe(
            (me) => {
                this.Me = me;
                this.BaseInit();
            }
        )

    }

    BaseInit()
    {
        if(this.Me)
        {
            if(this.Me.role == 'investor')
            {
                this.UpdateCompanyDics();
            }
            else
            {

            }
        }
    }

    UpdateCompanyDics()
    {
        this.CompanyDics = [
            {name: 'All companies', value: '', isSelected: true}
        ];
        this.RefreshCompanies(
            (result) => {
                if(result)
                {
                    result.forEach(element => {
                        this.CompanyDics[element.company_id] = {name: element.company_name, value: element.company_id, isSelected:false};
                    });
                }
                this.CompanyDics = this.CompanyDics.filter(Val => Val != null);
                this.CompanyDicsUpdated.next(true);
            }
        );
    }

    RefreshCompanies(callback?: (res) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/companies/my.json'),
            (result) =>{
                // console.log(result);
                callback(result);
            },
            (err) => {
                callback(null);
            }
        )
        
    }

    GetInvestmentAmount(CompanyId?, callbackOk?: (res) => void, callbackFail?: (err) => void)
    {
        return this.http.CommonRequest(
            () => this.http.GetData(
                '/users/' + this.Me.id + '/investor_graphics/amount_invested.json', 
                this.type.ParamsToUrlSearchParams(CompanyId ? {'company_id' : CompanyId} : null)
            ),
            callbackOk,
            callbackFail
        );
    }

    GetCompaniesAmount(CompanyId?, callbackOk?: (res) => void, callbackFail?: (err) => void)
    {
        return this.http.CommonRequest(
            () => this.http.GetData(
                '/users/' + this.Me.id + '/investor_graphics/amount_of_companies.json', 
                this.type.ParamsToUrlSearchParams(CompanyId ? {'company_id' : CompanyId} : null)
            ),
            callbackOk,
            callbackFail
        );
    }

    GetTotalChartData(Period, CompanyId?, callbackOk?: (res) => void, callbackFail?: (err) => void)
    {
        return this.http.CommonRequest(
            () => this.http.GetData(
                '/users/' + this.Me.id + '/investor_graphics/total_current_value.json', 
                this.type.ParamsToUrlSearchParams({'period': Period ,'company_id' : CompanyId? CompanyId : null})
            ),
            callbackOk,
            callbackFail
        );
    }

    GetRateOfReturnChartData(Period, CompanyId?, callbackOk?: (res) => void, callbackFail?: (err) => void)
    {
        return this.http.CommonRequest(
            () => this.http.GetData(
                '/users/' + this.Me.id + '/investor_graphics/rate_of_return.json', 
                this.type.ParamsToUrlSearchParams({'period': Period ,'company_id' : CompanyId? CompanyId : null})
            ),
            callbackOk,
            callbackFail
        );
    }

    RefreshNewsList(Params?: any, callbackOk?: (res) => void, callbackFail?: (err) => void)
    {
        let urlParams = {
            limit: Params && Params.limit ? Params.limit : this.NewsLimitLoad,
            offset: Params && Params.offset ? Params.offset : 0,
            company_id: Params && Params.company_id ? Params.company_id : ''
        };
        return this.http.CommonRequest(
            () => this.http.GetData(
                '/startup_news.json', 
                this.type.ParamsToUrlSearchParams(Params)
            ),
            (result) => {
                let arr = this.News;
                if(Params && Params.new)
                {
                        arr = [];
                }
                if(result)
                {
                    this.NewsTotal = result.count ? result.count : 0;

                    if(result.items)
                    {
                        result.items.forEach((obj) => {
                            arr[obj.id] = obj;
                        });
                    }
                }
                arr = arr.filter(obj => obj != null);
                this.News = arr;
                this.NewsUpdated.next(true);
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

    GetTotalEarn(callbackOk?: (res) => void, callbackFail?: (err) => void)
    {
        if(this.Me && this.Me.id && this.Me.company_id)
        {
            return this.http.CommonRequest(
                () => this.http.GetData('/users/' + this.Me.id + '/companies/' + this.Me.company_id + '/startup_graphics/total_earn.json'),
                callbackOk,
                callbackFail
            );
        }
        return null;
    }

    GetTotalInvestment(callbackOk?: (res) => void, callbackFail?: (err) => void)
    {
        if(this.Me && this.Me.id && this.Me.company_id)
        {
            return this.http.CommonRequest(
                () => this.http.GetData('/users/' + this.Me.id + '/companies/' + this.Me.company_id + '/startup_graphics/total_investment.json'),
                callbackOk,
                callbackFail
            );
        }
        return null;
    }

    GetScore(callbackOk?: (res) => void, callbackFail?: (err) => void)
    {
        if(this.Me && this.Me.id && this.Me.company_id)
        {
            return this.http.CommonRequest(
                () => this.http.GetData('/users/' + this.Me.id + '/companies/' + this.Me.company_id + '/startup_graphics/score.json'),
                callbackOk,
                callbackFail
            );
        }
        return null;
    }

    GetSales(callbackOk?: (res) => void, callbackFail?: (err) => void)
    {
        if(this.Me && this.Me.id && this.Me.company_id)
        {
            return this.http.CommonRequest(
                () => this.http.GetData('/users/' + this.Me.id + '/companies/' + this.Me.company_id + '/startup_graphics/sales.json'),
                callbackOk,
                callbackFail
            );
        }
        return null;
    }

    GetEvaluation(Period:string, callbackOk?: (res) => void, callbackFail?: (err) => void)
    {
        if(this.Me && this.Me.id && this.Me.company_id)
        {
            return this.http.CommonRequest(
                () => this.http.GetData('/users/' + this.Me.id + '/companies/' + this.Me.company_id + '/startup_graphics/evaluation.json',
                    this.type.ParamsToUrlSearchParams({period: Period})    
                ),
                callbackOk,
                callbackFail
            );
        }
        return null;
    }
}
