import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SignUpComponent } from './singup/signup.component';
import { AuthService } from '../core/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'auth-cmp',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
    BigForm = false;
    constructor(private auth: AuthService, private cdr: ChangeDetectorRef)
    {   
        this.auth.FormSizeBig.subscribe(
            (val) => 
            {
                this.BigForm = val;
            }
        )
    }
  ngOnInit() 
  {
    this.cdr.detectChanges();
  }
}
