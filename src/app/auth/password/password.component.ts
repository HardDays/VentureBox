import { TypeService } from './../../core/services/type.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Validator } from '../../core/base/field.validator';

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

        var res = Validator.ValidateEmail(this.Email);
        if(!res)
        {
            this.IsError = true;
            this.ErrorMsg = "Email is incorrect";
            return;
        }


        this.auth.ForgotPassword(this.Email,
            (res) => {
                this.IsSend = true;
            },
            (err) => {
                if(err.status == 401)
                {
                    if(err.body.error == "LOGIN_DOES_NOT_EXIST")
                    {
                        this.ErrorMsg = "Email does not exist!";
                    }
                    else
                    {
                        this.ErrorMsg = this.type.GetErrorText(err.json().error);
                    }
                }
                else
                {
                    this.ErrorMsg = this.type.GetErrorText(err.json().error);
                }
                this.IsError = true;
                // console.log(err);
            }
        );
    }
}
