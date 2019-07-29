import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IMenuItem } from '../../core/interfaces/menu.item.interface';
import { UserModel } from 'src/app/core/models/user.model';
import { CompanyModel } from '../../core/models/company.model';
import { DomSanitizer } from '@angular/platform-browser';

export enum MenuUrls
{
    dashboard = 'dashboard',
    my_products = 'my_products',
    my_investors = 'my_investors',
    crm = 'crm',
    portfolio = 'portfolio',
    my_news = 'my_news',
    my_milestones = 'my_milestones',
    startups = 'startups',
    marketplace = 'https://venturebox.myshopify.com/collections/all',
    tracking = 'tracking',

    applications = 'applications',
    my_portfolio_performance = 'my_portfolio_performance',
    scoring = 'scoring',


    community = 'community',
    events = 'events',
    roadmap = 'roadmap',
    toolbox = 'toolbox',
}

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
            url : MenuUrls.dashboard,//"dashboard",
            image : "assets/img/dashboard.svg",
            label : "Dashboard",
            visible: this.IsLoggedIn
        },
        {
            url : MenuUrls.my_products,//"my_products",
            image : "assets/img/my-products.svg",
            label : "My products",
            visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup' && this.MyCompany && this.MyCompany.id != null
        },
        {
            url : MenuUrls.my_investors,//"my_investors",
            image : "assets/img/my-investors.svg",
            label : "My investors",
            visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup' && this.MyCompany && this.MyCompany.id != null
        },
        {
            url : MenuUrls.crm,//"crm",
            image : "assets/img/crm.svg",
            label : "CRM",
            visible : this.IsLoggedIn && this.Me && this.Me.role == 'startup'
        },
        {
            url : MenuUrls.portfolio,//"portfolio",
            image : "assets/img/portfolio.svg",
            label : "Portfolio Management",
            visible : this.IsLoggedIn && this.Me && this.Me.role != 'startup'
        },
        {
            url : MenuUrls.my_news,//"my_news",
            image : "assets/img/my-news.svg",
            label : "My news",
            visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup'
        },
        {
            url : MenuUrls.my_milestones,//"my_milestones",
            image : "assets/img/my-milestones.svg",
            label : "My milestones",
            visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup' && this.MyCompany && this.MyCompany.id != null
        },
        {
            url : MenuUrls.startups,//"startups",
            image : "assets/img/startups-upp.svg",
            label : "Startups Application",
            visible: this.IsLoggedIn && this.Me && this.Me.role != 'startup'
        },
        {
            url: MenuUrls.marketplace,//"https://vb-test-back2.myshopify.com/collections/all",
            image : "assets/img/marketplace.svg",
            label : "Marketplace",
            visible: true
        },
        {
            url: MenuUrls.tracking,
            image : "assets/img/tracking.svg",
            label : "Tracking",
            visible: true
        },

        {
            url: MenuUrls.applications,
            image : "assets/img/resume.svg",
            label : "Applications",
            visible: this.IsLoggedIn && this.Me && this.Me.role != 'startup'
        },
        {
            url: MenuUrls.my_portfolio_performance,
            image : "assets/img/business-cards.svg",
            label : "My portfolio performance",
            visible: this.IsLoggedIn && this.Me && this.Me.role != 'startup'
        },
        {
            url: MenuUrls.scoring,
            image : "assets/img/star (5).svg",
            label : "Scoring",
            visible: this.IsLoggedIn && this.Me && this.Me.role != 'startup'
        },


        {
            url: MenuUrls.community,
            image : "assets/img/collaboration.svg",
            label : "Community",
            visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup'
        },
        {
            url: MenuUrls.events,
            image : "assets/img/calendar (4).svg",
            label : "Events",
            visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup'
        },
        {
            url: MenuUrls.roadmap,
            image : "assets/img/distance (2).svg",
            label : "Roadmap",
            visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup'
        },
        {
            url: MenuUrls.toolbox,
            image : "assets/img/toolbox.svg",
            label : "Toolbox",
            visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup'
        }
    ];
    constructor(private router: Router, private auth: AuthService, private sanitizer: DomSanitizer)
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
                url : MenuUrls.dashboard,//"dashboard",
                image : "assets/img/dashboard.svg",
                label : "Dashboard",
                visible: this.IsLoggedIn
            },
            {
                url : MenuUrls.my_products,//"my_products",
                image : "assets/img/my-products.svg",
                label : "My products",
                visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup' && this.MyCompany && this.MyCompany.id != null
            },
            {
                url : MenuUrls.my_investors,//"my_investors",
                image : "assets/img/my-investors.svg",
                label : "My investors",
                visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup' && this.MyCompany && this.MyCompany.id != null
            },
            {
                url : MenuUrls.crm,//"crm",
                image : "assets/img/crm.svg",
                label : "CRM",
                visible : this.IsLoggedIn && this.Me && this.Me.role == 'startup'
            },
            {
                url : MenuUrls.portfolio,//"portfolio",
                image : "assets/img/portfolio.svg",
                label : "Portfolio Management",
                visible : this.IsLoggedIn && this.Me && this.Me.role != 'startup'
            },
            {
                url : MenuUrls.my_news,//"my_news",
                image : "assets/img/my-news.svg",
                label : "My news",
                visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup'
            },
            {
                url : MenuUrls.my_milestones,//"my_milestones",
                image : "assets/img/my-milestones.svg",
                label : "My milestones",
                visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup' && this.MyCompany && this.MyCompany.id != null
            },
            {
                url : MenuUrls.startups,//"startups",
                image : "assets/img/startups-upp.svg",
                label : "Startups Application",
                visible: this.IsLoggedIn && this.Me && this.Me.role != 'startup'
            },
            {
                url: MenuUrls.marketplace,//"https://vb-test-back2.myshopify.com/collections/all",
                image : "assets/img/marketplace.svg",
                label : "Marketplace",
                visible: true
            },
            {
                url: MenuUrls.tracking,
                image : "assets/img/tracking.svg",
                label : "Tracking",
                visible: true
            },


        {
            url: MenuUrls.applications,
            image : "assets/img/resume.svg",
            label : "Applications",
            visible: this.IsLoggedIn && this.Me && this.Me.role != 'startup'
        },
        {
            url: MenuUrls.my_portfolio_performance,
            image : "assets/img/business-cards.svg",
            label : "My portfolio performance",
            visible: this.IsLoggedIn && this.Me && this.Me.role != 'startup'
        },
        {
            url: MenuUrls.scoring,
            image : "assets/img/star (5).svg",
            label : "Scoring",
            visible: this.IsLoggedIn && this.Me && this.Me.role != 'startup'
        },


        {
            url: MenuUrls.community,
            image : "assets/img/collaboration.svg",
            label : "Community",
            visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup'
        },
        {
            url: MenuUrls.events,
            image : "assets/img/calendar (4).svg",
            label : "Events",
            visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup'
        },
        {
            url: MenuUrls.roadmap,
            image : "assets/img/distance (2).svg",
            label : "Roadmap",
            visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup'
        },
        {
            url: MenuUrls.toolbox,
            image : "assets/img/toolbox.svg",
            label : "Toolbox",
            visible: this.IsLoggedIn && this.Me && this.Me.role == 'startup'
        }
        ];
    }

    OpenLink(item)
    {
        const url = this.sanitizer.bypassSecurityTrustResourceUrl(item.url);
        window.open(item.url, "_blank");
    }



}
