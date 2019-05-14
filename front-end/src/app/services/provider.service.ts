import { Injectable } from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {IAuthResponse, ICompany, IPosition} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }
/* begin company requests */
  createCompany(companyName: any): Promise<ICompany> {
    console.log('create company request with companyname:' + companyName + 'has sent');
    return this.post('http://localhost:8000/api/companies/', {
      name : companyName
    });
  }
  getCompanies(): Promise<ICompany[]> {
    console.log('get companies request has sent');
    return this.get('http://localhost:8000/api/companies/', {});
  }
  /* end company requests */
  /* position requests */
  createPosition(positionName: any, positionLink: any, positionLocation: any,
                 positionType: any, positionCompanyID: any): Promise<IPosition> {
    console.log('create position request with positionName:' + positionName + 'has sent');
    return this.post('http://localhost:8000/api/position/', {
      name: positionName,
      link: positionLink,
      location: positionLocation,
      type: positionType,
      company: positionCompanyID
    });
  }

  /* position requests end */
  auth(newLogin: any, newPassword: any): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: newLogin,
      password: newPassword
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {
    });
  }
}
