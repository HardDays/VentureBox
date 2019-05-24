import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

    constructor(private auth: AuthService)
    {
    }

    ngOnInit()
    {
        this.auth.FormSizeBig.next(false);
    }
  

}
