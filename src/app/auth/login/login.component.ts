import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginModel } from 'src/app/core/models/login.model';

@Component({
  selector: 'login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    LoginModel: LoginModel = new LoginModel();

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        this.auth.FormSizeBig.next(false);
    }

    Login () {
      this.auth.Login(this.LoginModel)
        .subscribe(
          (res) => {
            this.auth.SetCurrentUser(res.json());
          }
        );
    }


}
