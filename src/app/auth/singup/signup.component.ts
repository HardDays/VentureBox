import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signup-cmp',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit 
{
    Value = 'startup';
    Step = 1;

    constructor(private auth: AuthService,
            private router: Router
        )
    {
        this.auth.FormSizeBig.next(true);
    }

    ngOnInit()
    {
        this.auth.FormSizeBig.next(true);
    }

    TypeChange(Value)
    {
        this.Value = Value;
    }

    NextStep()
    {
        this.Step = 2;
        this.auth.FormSizeBig.next(false);
    }

    Register()
    {
        this.auth.FormSizeBig.next(false);
        this.Step = 1;
        this.router.navigate(["/auth", "login"]);
    }
}