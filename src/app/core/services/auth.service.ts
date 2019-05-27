import { CompanyModel } from './../models/company.model';
import { LoginModel } from './../models/login.model';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { TokenModel } from '../models/token.model';

@Injectable()
export class AuthService {

    public onAuthChange$: Subject<boolean> = new Subject<boolean>();
    public Me: any;
    public IsLoggedIn: boolean = false;

    public FormSizeBig = new Subject<boolean>();
    public CurrentSize: boolean = false;

    constructor(private http: HttpService) {
        this.FormSizeBig.subscribe((val) => {
            this.CurrentSize = val;
        });

        this.onAuthChange$.subscribe(
          (val) =>
          {
            this.IsLoggedIn = val;
          }
        )

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

    Login(loginModel: LoginModel,  success?: (data) => void, fail?: (err) => void)
    {
      return this.http.CommonRequest(
        () => this.http.PostData('/auth/login', loginModel),
        success,
        fail
      )
    }
    Logout()
    {
      return this.http.CommonRequest(
        () => this.http.PostData('/auth/logout', {}),
        (res) =>
        {
          this.ClearSession()
        }
      )

      return ;
    }
    ForgotPassword(email: string,  success?: (data) => void, fail?: (err) => void)
    {
      return this.http.CommonRequest(
        () => this.http.PostData('/auth/forgot_password', {email}),
        success,
        fail
      )
    }


    BaseInitAfterLogin(data: TokenModel)
    {
        localStorage.setItem('token',data.token);
        this.http.BaseInitByToken(data.token);
        this.onAuthChange$.next(true);
    }

    TryToLoginWithToken()
    {
        let token = localStorage.getItem('token');
        if(token)
        {
            this.BaseInitAfterLogin(new TokenModel(token));
            this.onAuthChange$.next(true);
        }
    }


    ClearSession()
    {
        this.http.token = null;
        this.http.headers.delete('Authorization');
        this.onAuthChange$.next(false);
        localStorage.removeItem('token');
    }

    CreateUser(user: UserModel) {
      return this.http.PostData('/users', user);
    }

    CreateCompany(company: CompanyModel) {
      return this.http.PostData('/users/' + company.user_id + '/companies', company);
    }

}
