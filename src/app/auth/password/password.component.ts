import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

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
        const i = Math.floor(Math.random() * 2);

        if(i%2)
        {
            this.IsError = true;
        }
        else
        {
            this.IsError = false;
        }

        if(!this.IsError)
        {
            this.IsSend = true;
        }
    }
}