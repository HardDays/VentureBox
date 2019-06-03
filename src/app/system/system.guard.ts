import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Injectable()
export class SystemAccessGuard implements CanActivate{
    constructor(private auth: AuthService, private router: Router)
    {}
    canActivate(router:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean
    {
        // console.log(router.routeConfig.path);
        switch (router.routeConfig.path) {
            case 'my_products' : {
                return this.MyProductsNavigate();
                break;
            }
            case 'my_news' : {
                return this.NewsNavigate();
                break;
            }
            default: {
                return true;
            }
        }
    }

    NewsNavigate()
    {
        if(!this.auth.IsLoggedIn)
        {
            this.router.navigate(["/auth"]);
            return false;
        }
        return true;
    }

    MyProductsNavigate()
    {
        if(!this.auth.IsLoggedIn)
        {
            this.router.navigate(["/auth"]);
            return false;
        }
        else
        {
            if(this.auth.Me)
            {
                if(this.auth.Me.role == 'startup' && this.auth.MyCompany && this.auth.MyCompany.id)
                {
                    return true;
                }
            }
            
        }
        this.router.navigate(["/system", "crm"]);
        return false;
    }

    LoginNavigate() {}
}
