import { LoginModel } from './../models/login.model';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { TokenModel } from '../models/token.model';

@Injectable()
export class AuthService {

    public onAuthChange$: Subject<boolean> = new Subject();
    public me: any;
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


    BaseInitAfterLogin(data:TokenModel)
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

}
