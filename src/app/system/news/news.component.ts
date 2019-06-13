import { StartupsService } from './../../core/services/startups.service';
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

  Image = '';
  ErrorText = '';

  constructor(private auth: AuthService, private news: NewsService, private startupsService: StartupsService) {
  }

  ngOnInit() {
    this.News.user_id = this.auth.Me.id;
    this.News.company_id = this.auth.Me.company_id;

    this.GetListNews();

    this.GetImage();
    this.auth.onMeChange$.subscribe(
      (res) => {
        this.GetImage();
      }
    );
  }

  GetImage () {
    if (this.auth.Me.company_id)
      this.Image = this.startupsService.GetCompanyImageUrl(this.auth.Me.company_id, {width: 480, height: 280});
  }

  AddNews() {
    if (this.News.text) {
      this.news.PostStartupNews(this.News)
        .subscribe (
          (res) => {
            this.ErrorText = '';
            this.News.text = '';
            this.GetListNews();
          }
        );
    } else {
      this.ErrorText = 'News text can\'t be blank!';
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
