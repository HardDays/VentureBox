import { LoginModel } from './../models/login.model';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

    public onAuthChange$: Subject<boolean>;
    public me: any;

    public FormSizeBig = new Subject<boolean>();
    public CurrentSize: boolean = false;

    constructor(private http: HttpService) {
        this.FormSizeBig.subscribe((val) => {
            this.CurrentSize = val;
        });

        this.onAuthChange$ = new Subject();
        this.onAuthChange$.next(false);
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

}
