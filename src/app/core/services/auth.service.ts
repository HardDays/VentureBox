import { CompanyModel } from './../models/company.model';
import { LoginModel } from './../models/login.model';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { TokenModel } from '../models/token.model';
import { Router } from '@angular/router';
@Injectable()
export class AuthService 
{
    protected token_field:string = "token";

    public onAuthChange$: Subject<boolean> = new Subject<boolean>();
    public Me: UserModel = new UserModel();
    public onMeChange$: Subject<UserModel> = new Subject<UserModel>();
    public IsLoggedIn: boolean = false;

    public MyCompany: CompanyModel = new CompanyModel();
    public onMyCompanyChange$: Subject<CompanyModel> = new Subject<CompanyModel>();

    public FormSizeBig = new Subject<boolean>();
    public CurrentSize: boolean = false;

    constructor(private http: HttpService, private router: Router) {
        this.FormSizeBig.subscribe((val) => {
            this.CurrentSize = val;
        });

        this.onMeChange$.subscribe((val) => {
          if(val && val.company_id && val.role == "startup")
          {
            this.GetMyCompany();
          }
          else{
            this.InitMyCompany(null);
          }
        });

        this.onAuthChange$.subscribe
        (
          (val) =>
          {
            this.IsLoggedIn = val;

            if (this.IsLoggedIn) 
            {
              this.GetMeByToken();
            }
            else 
            {
              this.Me = null;
              this.onMeChange$.next(this.Me);
              // this.router.navigate(['/auth']);
            }
          }
        )

        this.onAuthChange$.next(false);
    }

    SetCurrentToken(token: string) {
      if (token) {
        if (localStorage.getItem(this.token_field)) {
          localStorage.removeItem(this.token_field);
        }
        localStorage.setItem(this.token_field, token);
        this.http.BaseInitByToken(token);
      } else {
        localStorage.removeItem(this.token_field);
      }
    }

    SetCurrentUser(user) 
    {
      this.Me = user;
      this.SetCurrentToken(this.Me.token);
      this.onAuthChange$.next(true);
    }

    SetUserByCurrentToken() {
      if (localStorage.getItem(this.token_field)) {

        // get my user by token
        // this.Me = user

        this.onAuthChange$.next(true);
      } else {
        localStorage.removeItem(this.token_field);
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
          this.ClearSession();
        }
      )
    }
    
    ForgotPassword(email: string,  success?: (data) => void, fail?: (err) => void)
    {
      return this.http.CommonRequest(
        () => this.http.PostData('/auth/forgot_password', {email}),
        success,
        fail
      )
    }

    GetMeByToken() 
    {
      return this.http.CommonRequest(
        () => this.http.GetData('/users/me', ''),
        (res) =>
        {
          this.Me = res;
          this.onMeChange$.next(this.Me);
        }
      )
    }

    GetMyCompany()
    {
      return this.http.CommonRequest(
        () => this.http.GetData("/companies/" + this.Me.company_id + ".json"),
        (res : CompanyModel) => {
          if(res && res.id == this.Me.company_id)
          {
            this.InitMyCompany(res);
          }
          else{
            this.InitMyCompany(null);
          }
        },
        (err) => {
          this.InitMyCompany(null);
        }
      );
    }

    GetMe() 
    {
      return this.Me;
    }

    InitMyCompany(company?: CompanyModel)
    {
      this.MyCompany = company;
      this.onMyCompanyChange$.next(this.MyCompany);
    }


    BaseInitAfterLogin(data: TokenModel)
    {
        localStorage.setItem(this.token_field ,data.token);
        this.http.BaseInitByToken(data.token);
        this.onAuthChange$.next(true);
    }

    TryToLoginWithToken()
    {
        let token = localStorage.getItem(this.token_field);
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
        localStorage.removeItem(this.token_field);
    }

    CreateUser(user: UserModel) {
      return this.http.PostData('/users', user);
    }

    CreateCompany(company: CompanyModel) {
      return this.http.PostData('/users/' + company.user_id + '/companies', company);
    }

    UpdateMyGeneralInfo(Params: any, success?: (ok) => void, fail?: (error) => void)
    {
      return this.http.CommonRequest(
        () => this.http.PatchData('/users/' + this.Me.id + '/change_general.json', Params),
        (res:UserModel) => {
          this.Me = res;
          this.onMeChange$.next(this.Me);
          if(success && typeof success == "function"){
            success(res);
          }
        },
        (err) => {
          if(fail && typeof fail == "function"){
            fail(err);
          }
        }
      );
    }

    UpdateMyEmailInfo(Params: any, success?: (ok) => void, fail?: (error) => void)
    {
      return this.http.CommonRequest(
        () => this.http.PatchData('/users/' + this.Me.id + '/change_email.json', Params),
        (res:UserModel) => {
          this.Me = res;
          this.onMeChange$.next(this.Me);
          if(success && typeof success == "function"){
            success(res);
          }
        },
        (err) => {
          if(fail && typeof fail == "function"){
            fail(err);
          }
        }
      );
    }

    UpdateMyPassword(Params: any, success?: (ok) => void, fail?: (error) => void)
    {
      return this.http.CommonRequest(
        () => this.http.PatchData('/users/' + this.Me.id + '/change_password.json', Params),
        (res) => {
          this.Me = res;
          this.onMeChange$.next(this.Me);
          if(success && typeof success == "function"){
            success(res);
          }
        },
        (err) => {
          if(fail && typeof fail == "function"){
            fail(err);
          }
        }
      );
    }

}
