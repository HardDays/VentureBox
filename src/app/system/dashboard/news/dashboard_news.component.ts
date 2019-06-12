import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NewsModel } from 'src/app/core/models/news.model';


@Component({
  selector: 'app-dashboard-news-cmp',
  templateUrl: './dashboard_news.component.html'
})
export class DashboardNewsComponent implements OnInit 
{

    @Input() Model: NewsModel;
    
    ngOnInit(): void {
        
    }
}