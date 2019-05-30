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
export class NewsService {

    constructor(private http: HttpService) {
    }

    PostStartupNews(news: NewsModel) {
      return this.http.PostData('/users/' + news.user_id + '/companies/' + news.company_id + '/startup_news', news);
    }

    GetStartupNews(user_id: number, company_id: number) {
      return this.http.GetData('/users/' + user_id + '/companies/' + company_id + '/startup_news', '');
    }

    DeleteStartupNews(user_id: number, company_id: number, id: number) {
      return this.http.DeleteData('/users/' + user_id + '/companies/' + company_id + '/startup_news/' + id);
    }


}
