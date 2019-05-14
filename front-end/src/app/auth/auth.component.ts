import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../services/provider.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  logged = false;
  username: any = '';
  password: any = '';
  token: any = '';

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    console.log('Token:' + token);
    if (token) {
      this.token = token;
      this.logged = true;
    }
  }
  login() {
    if (this.username !== '' && this.password !== '') {
      console.log('login request has sent');
      this.provider.auth(this.username, this.password).then(
        res => {
          localStorage.setItem('token', res.token);
          this.token = res.token;
          this.logged = true;
        });
    }
  }

}
