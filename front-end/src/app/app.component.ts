import { Component } from '@angular/core';
import {ProviderService} from './services/provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front-end';

  constructor(private provider: ProviderService) { }
  logout() {
    console.log('logout request has sent');
    this.provider.logout().then(res => {
      localStorage.clear();
    });
  }
}
