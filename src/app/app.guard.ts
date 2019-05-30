import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Injectable } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Injectable()
export class AppAccessGuard implements CanActivate
{
    constructor(private auth: AuthService, private router: Router)
    {}
    canActivate(router:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean
    {
        // console.log(router.routeConfig.path);
        switch(router.routeConfig.path)
        {
            case "auth":{
               return this.SystemNavigate();
            }
            default:{
                return true;
            }
        }
    }

    private LoginHandler(router:ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean
    {
        return true;
    }

    SystemNavigate()
    {
        if(this.auth.IsLoggedIn)
        {
            this.router.navigate(["/system"]);
        }
        return !this.auth.IsLoggedIn;
    }

    LoginNavigate()
    {
        return !this.auth.IsLoggedIn;
    }
}