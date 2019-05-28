import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'system-cmp',
  templateUrl: './system.component.html'
})
export class SystemComponent implements OnInit{
    IsLoggedIn = false;
    Me = {
      name: '',
      surname: '',
      role: ''
    };
    constructor(private cdr: ChangeDetectorRef,
        private auth: AuthService, private router: Router)
    {
        this.auth.onAuthChange$.subscribe((val) => {
            this.IsLoggedIn = val;

        });
        this.auth.onMeChange$.subscribe((val) => {
            this.Me = this.auth.GetMe();
        });
    }
    ngOnInit() {
        this.cdr.detectChanges();

        this.IsLoggedIn = this.auth.IsLoggedIn;

        this.Me = this.auth.GetMe();
    }

    Logout()
    {
        this.auth.Logout();
    }
}
