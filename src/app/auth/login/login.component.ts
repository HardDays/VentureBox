import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginModel } from 'src/app/core/models/login.model';
import { TokenModel } from '../../core/models/token.model';
import { Router } from '@angular/router';
import { Validator } from '../../core/base/field.validator';

@Component({
  selector: 'login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    LoginModel: LoginModel = new LoginModel();
    PasswordError:string = "";
    EmailError:string = "";
    constructor(private auth: AuthService,
        private router: Router) {
    }

    ngOnInit() {
        this.auth.FormSizeBig.next(false);
    }

    Login ()
    {
      this.EmailError = "";
      this.PasswordError = "";

      if(!this.LoginModel.email)
      {
        this.EmailError = "Email is required!";
        return;
      }
      else if(!Validator.ValidateEmail(this.LoginModel.email))
      {
        this.EmailError = "Email is incorrect";;
        return;
      }
      if (!this.LoginModel.password)
      {
        this.PasswordError = "Password can't be blank!";
        return;
      }
      if (this.LoginModel.password.length < 4)
      {
        this.PasswordError = "Password must be over 4 characters";
        return;
      }

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
            if(err.status === 404 || err.status === 403)
            {
              this.PasswordError = "Incorrect E-mail or password!";
            }
          }
        )
    }


}
