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
    constructor(private cdr: ChangeDetectorRef,
        private auth: AuthService, private router: Router)
    {
        this.auth.onAuthChange$.subscribe((val) => {
            this.IsLoggedIn = val;
        });
    }
    ngOnInit() {
        this.cdr.detectChanges();

        this.IsLoggedIn = this.auth.IsLoggedIn;

    }

    Logout()
    {
        this.auth.Logout();
    }
}
