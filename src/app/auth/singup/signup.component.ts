import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'signup-cmp',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit 
{
    Value = 'startup';

    constructor(private auth: AuthService)
    {

    }

    ngOnInit()
    {
        this.TypeChange(this.Value);

    }

    TypeChange(Value)
    {
        this.Value = Value;

        this.auth.FormSizeBig.next(this.Value == 'investor');
    }
}