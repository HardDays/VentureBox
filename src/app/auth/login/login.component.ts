import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginModel } from 'src/app/core/models/login.model';
import { TokenModel } from '../../core/models/token.model';
import { Router } from '@angular/router';

@Component({
  selector: 'login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    LoginModel: LoginModel = new LoginModel();
    Error:string = "";
    constructor(private auth: AuthService,
        private router: Router) {
    }

    ngOnInit() {
        this.auth.FormSizeBig.next(false);
    }

    Login ()
    {
      this.Error = "";
      this.auth.Login(
        this.LoginModel,
        (res : TokenModel) => {
          if(res && res.token)
          {
            this.auth.BaseInitAfterLogin(res);
            this.router.navigate(["/system"]);
          }

        },
        (err) =>
          {
            if(err.status === 404)
            {
              this.Error = "Incorrect E-mail or password!";
            }
          }
        )
    }


}
