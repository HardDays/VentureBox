import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';

@Injectable()
export class SystemAccessGuard implements CanActivate{
    canActivate(router:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean
    {

        switch (router.routeConfig.path) {
            default: {
                return true;
            }
        }
    }

    LoginNavigate() {}
}
