import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../services/provider.service';
import {ICompany} from '../models/models';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  companyName: any = '';
  companies: ICompany[] = [];

  public logged = false;
  public login: any = '';
  public password: any = '';

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    localStorage.setItem('token', '3a34ee79c0d3507a17c71b51650f8d64f2720979');
    const token = localStorage.getItem('token');
    console.log('Token:' + token);
    if (token) {
      this.logged = true;
    }
    if (this.logged) {
      this.provider.getCompanies().then(res => {
        this.companies = res;
        console.log('get companies response has delivered');
      });
    }

  }

  createCompany() {
    if (this.companyName !== '') {
      this.provider.createCompany(this.companyName).then(res => {
        this.companyName = '';
        console.log('Company with name:' + res.name + 'created');
      });
    }
  }

  getCompanies() {

  }

  debugLogin() {
  }

}
