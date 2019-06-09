import { AuthService } from './../../core/services/auth.service';
import { NewsModel } from './../../core/models/news.model';
import { NewsService } from './../../core/services/news.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'news-cmp',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  NewsList: NewsModel[] = [];
  News: NewsModel = new NewsModel();

  constructor(private auth: AuthService, private news: NewsService) {
  }

  ngOnInit() {
    this.News.user_id = this.auth.Me.id;
    this.News.company_id = this.auth.Me.company_id;

    this.GetListNews();
  }

  AddNews() {
    if (this.News.text) {
      this.news.PostStartupNews(this.News)
        .subscribe (
          (res) => {
            this.News.text = '';
            this.GetListNews();
          }
        );
    }
  }

  GetListNews() {
    this.news.GetStartupNews(this.auth.Me.id, this.auth.Me.company_id)
      .subscribe (
        (res) => {
          this.NewsList = res.json()['items'];
        }
      );
  }

  DeleteNews(id: number) {
    this.news.DeleteStartupNews(this.auth.Me.id, this.auth.Me.company_id, id)
      .subscribe (
        (res) => {
          this.GetListNews();
        }
      );
  }



}
