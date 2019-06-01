import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IMenuItem } from '../../core/interfaces/menu.item.interface';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'navigation-cmp',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
    Me: UserModel = new UserModel();
    CurrentPage = "";
    MenuItems: IMenuItem[] = [
        {
            url : "dashboard",
            image : "assets/img/dashboard.svg",
            label : "Dashboard"
        },
        {
            url : "my_products",
            image : "assets/img/my-products.svg",
            label : "My products"
        },
        {
            url : "my_investors",
            image : "assets/img/my-investors.svg",
            label : "My investors"
        },
        {
            url : "crm",
            image : "assets/img/crm.svg",
            label : "CRM"
        },
        {
            url : "my_news",
            image : "assets/img/my-news.svg",
            label : "My news"
        },
        {
            url : "my_milestones",
            image : "assets/img/my-milestones.svg",
            label : "My milestones"
        }
    ];
    constructor(private router: Router, private auth: AuthService)
    {
        this.router.events.subscribe((event) =>{
            if(event instanceof NavigationEnd)
            {
                for(const item of this.MenuItems)
                {
                    if(event.url.indexOf(item.url) > -1)
                    {
                        this.CurrentPage = item.url;
                    }
                }
            }
        });
    }

    ngOnInit()
    {
      this.Me = this.auth.Me;
      this.auth.onMeChange$.subscribe(
        (res) => {
          this.Me = this.auth.Me;
        }
      );
    }



}
