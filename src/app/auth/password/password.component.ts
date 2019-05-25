import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Validator } from '../../core/base/field.validator';

@Component({
  selector: 'password-cmp',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit 
{
    IsSend = false;
    IsError = false;
    ErrorMsg = "";
    Email:string = "";

    constructor(private auth: AuthService)
    {

    }

    ngOnInit()
    {
        this.auth.FormSizeBig.next(false);
    }

    protected RestorePassword()
    {
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
                        this.ErrorMsg = err.body.error.split("_").join(" ").toLowerCase();
                    }
                }
                else
                {
                    this.ErrorMsg = err.body.error.split("_").join(" ").toLowerCase();
                }
                this.IsError = true;
                // console.log(err);
            }    
        );
        
        // const i = Math.floor(Math.random() * 2);

        // if(i%2)
        // {
        //     this.IsError = true;
        // }
        // else
        // {
        //     this.IsError = false;
        // }

        // if(!this.IsError)
        // {
        //     this.IsSend = true;
        // }
    }
}