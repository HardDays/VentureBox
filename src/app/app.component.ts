import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  title = 'VentureBox';
  isLoggedIn:boolean = false;
  constructor(private auth: AuthService)
  {

  }
  ngOnInit()
  {
    this.auth.onAuthChange$.subscribe(
      bool =>
      {
        this.isLoggedIn = bool;
      });

    this.auth.TryToLoginWithToken();
  }
}
