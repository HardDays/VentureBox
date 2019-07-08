import { CompanyModel } from '../models/company.model';
import { LoginModel } from '../models/login.model';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { TokenModel } from '../models/token.model';
import { Router } from '@angular/router';
import { NewsModel } from '../models/news.model';

@Injectable()
export class TrackingService {

    constructor(private http: HttpService) {
    }

    AddTracking(date: string, company_id: number, success?: (ok) => void, fail?:(err) => void) {
      this.http.CommonRequest(
        () => this.http.PostData('/tracking/mark_payed', {date, company_id}),
        success,
        fail
      );
    }

    // role = enum { startup, investor }
    GetTrackings(role: string, success?: (ok) => void, fail?:(err) => void) {
      this.http.CommonRequest(
        () => this.http.GetData('/tracking/' + role, ''),
        success,
        fail
      );
    }

}
