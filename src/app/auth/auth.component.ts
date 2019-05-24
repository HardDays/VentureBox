import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SignUpComponent } from './singup/signup.component';
import { AuthService } from '../core/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'auth-cmp',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    BigForm = false;
    Subscriptions = {
        change_form_size: null
    };
    constructor(private auth: AuthService)
    {   
        this.Subscriptions.change_form_size = this.auth.FormSizeBig.subscribe(
            (val) => {
                this.BigForm = val;
            }
        )
    }
  ngOnInit() 
  {
  }

  ngOnDestroy()
  {
      for(const item in this.Subscriptions)
      {
          this.Subscriptions[item].unsubscribe();
      }
  }
}
