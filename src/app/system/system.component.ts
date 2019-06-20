import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Subscription } from 'rxjs';
import { UserModel } from '../core/models/user.model';


@Component({
  selector: 'system-cmp',
  templateUrl: './system.component.html'
})
export class SystemComponent implements OnInit{
    IsLoggedIn = false;
    Me: UserModel = new UserModel();
    Initials = '';

    SideBarVisible = false;
    constructor(private cdr: ChangeDetectorRef,
        private auth: AuthService, private router: Router)
    {
        this.auth.onAuthChange$.subscribe((val) => {
            this.IsLoggedIn = val;

        });
        this.auth.onMeChange$.subscribe((val) => {
            this.Me = this.auth.GetMe();
            this.getInitials();
        });
    }
    ngOnInit() {
        this.cdr.detectChanges();

        this.IsLoggedIn = this.auth.IsLoggedIn;

        this.Me = this.auth.GetMe();
        this.getInitials();

    }

    getInitials()
    {
        let initials = "";
        if (this.Me && this.Me.name && this.Me.surname)
        {
            if(this.Me.name && this.Me.name.length > 0)
            {
                initials += this.Me.name[0].toUpperCase();
            }

            if(this.Me.surname && this.Me.surname.length > 0)
            {
                initials += this.Me.surname[0].toUpperCase();
            }
        }
        this.Initials = initials;
    }

    Logout()
    {
        this.auth.Logout();
    }


}
