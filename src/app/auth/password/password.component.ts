import { TypeService } from './../../core/services/type.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'password-cmp',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
    IsSend = false;
    IsError = false;
    ErrorMsg = '';

    Email = '';

    constructor(private auth: AuthService, private type: TypeService) {}

    ngOnInit() {
        this.auth.FormSizeBig.next(false);
    }

    protected RestorePassword() {
        this.IsError = false;

        this.auth.ForgotPassword(this.Email)
          .subscribe(
            (res) => {
              this.IsError = false;
            },
            (err) => {
              this.IsError = true;
              this.ErrorMsg = this.type.GetErrorText(err.json().error);
            },
            () => {
              if (!this.IsError) {
                  this.IsSend = true;
              } else {
                this.IsSend = false;
              }
            }
          );
    }
}
