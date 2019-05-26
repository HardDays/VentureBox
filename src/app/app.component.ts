import { AuthService } from 'src/app/core/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VentureBox';

  constructor(private auth: AuthService) {
    this.auth.SetUserByCurrentToken();
  }
}
