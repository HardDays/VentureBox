import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IMenuItem } from '../../core/interfaces/menu.item.interface';
import { UserModel } from 'src/app/core/models/user.model';
import { CompanyModel } from '../../core/models/company.model';

@Component({
  selector: 'navigation-cmp',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
    Me: UserModel = new UserModel();
    MyCompany: CompanyModel = new CompanyModel();
    IsLoggedIn: boolean = false;
    CurrentPage = "";
    MenuItems: IMenuItem[] = [
        {
            url : "dashboard",
            image : "assets/img/dashboard.svg",
            label : "Dashboard",
            visible: true
        },
        {
            url : "my_products",
            image : "assets/img/my-products.svg",
            label : "My products",
            visible: this.IsLoggedIn && this.Me.role == 'startup' && this.MyCompany.id != null
        },
        {
            url : "my_investors",
            image : "assets/img/my-investors.svg",
            label : "My investors",
            visible: this.IsLoggedIn && this.Me.role == 'startup' && this.MyCompany.id != null
        },
        {
            url : "crm",
            image : "assets/img/crm.svg",
            label : "CRM",
            visible : true
        },
        {
            url : "my_news",
            image : "assets/img/my-news.svg",
            label : "My news",
            visible: this.IsLoggedIn
        },
        {
            url : "my_milestones",
            image : "assets/img/my-milestones.svg",
            label : "My milestones",
            visible: this.IsLoggedIn && this.Me.role == 'startup' && this.MyCompany.id != null
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
          this.UpdateMenuItems();
        }
      );

      this.MyCompany = this.auth.MyCompany;
      this.auth.onMyCompanyChange$.subscribe(
          (res) => {
              this.MyCompany = this.auth.MyCompany;
              this.UpdateMenuItems();
          }
      );

      this.IsLoggedIn = this.auth.IsLoggedIn;
      this.auth.onAuthChange$.subscribe(
          val => {
              this.IsLoggedIn = this.auth.IsLoggedIn;
              this.UpdateMenuItems();
          }
      )
      this.UpdateMenuItems();
    }

    UpdateMenuItems()
    {
        this.MenuItems = [
            {
                url : "dashboard",
                image : "assets/img/dashboard.svg",
                label : "Dashboard",
                visible: true
            },
            {
                url : "my_products",
                image : "assets/img/my-products.svg",
                label : "My products",
                visible: this.IsLoggedIn && (this.Me && this.Me.role == 'startup') && (this.MyCompany && this.MyCompany.id != null)
            },
            {
                url : "my_investors",
                image : "assets/img/my-investors.svg",
                label : "My investors",
                visible: this.IsLoggedIn && (this.Me && this.Me.role == 'startup') && (this.MyCompany && this.MyCompany.id != null)
            },
            {
                url : "crm",
                image : "assets/img/crm.svg",
                label : "CRM",
                visible : true
            },
            {
                url : "my_news",
                image : "assets/img/my-news.svg",
                label : "My news",
                visible: this.IsLoggedIn
            },
            {
                url : "my_milestones",
                image : "assets/img/my-milestones.svg",
                label : "My milestones",
                visible: this.IsLoggedIn && (this.Me && this.Me.role == 'startup') && (this.MyCompany && this.MyCompany.id != null)
            }
        ];
    }



}
