import { CompanyModel } from './../models/company.model';
import { LoginModel } from './../models/login.model';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthService {

    public onAuthChange$: Subject<boolean>;
    public Me: any;

    public FormSizeBig = new Subject<boolean>();
    public CurrentSize: boolean = false;

    constructor(private http: HttpService) {
        this.FormSizeBig.subscribe((val) => {
            this.CurrentSize = val;
        });

        this.onAuthChange$ = new Subject();
        this.onAuthChange$.next(false);
    }

    SetCurrentToken(token: string) {
      if (token) {
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
        }
        localStorage.setItem('token', token);
        this.http.BaseInitByToken(token);
      } else {
        localStorage.removeItem('token');
      }
    }

    SetCurrentUser(user) {
      this.Me = user;
      this.SetCurrentToken(this.Me.token);
      this.onAuthChange$.next(true);
    }

    SetUserByCurrentToken() {
      if (localStorage.getItem('token')) {

        // get my user by token
        // this.Me = user

        this.onAuthChange$.next(true);
      } else {
        localStorage.removeItem('token');
        this.onAuthChange$.next(false);
      }
    }

    Login(loginModel: LoginModel) {
      return this.http.PostData('/auth/login', loginModel);
    }
    Logout() {
      return this.http.PostData('/auth/logout', {});
    }
    ForgotPassword(email: string) {
      return this.http.PostData('/auth/forgot_password', {email});
    }

    CreateUser(user: UserModel) {
      return this.http.PostData('/users', user);
    }

    CreateCompany(company: CompanyModel) {
      return this.http.PostData('/users/' + company.user_id + '/companies', company);
    }

}
