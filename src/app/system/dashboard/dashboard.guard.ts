import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class DashboardAccessGuard implements CanActivate{
    constructor(private auth: AuthService, private router: Router)
    {}
    canActivate(router:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean
    {
        return true;
    }

}
