import { Injectable } from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {IAuthResponse, ICompany, IPosition, IStatus, IUserApplication} from '../models/models';

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

  updateUserApplication(id: number, idstatus: number) {
    return this.put('http://localhost:8000/api/user-applications/' + id + '/', {
      status: idstatus
    });
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
  getPositions(): Promise<IPosition[]> {
    console.log('get positions request has sent');
    return this.get('http://localhost:8000/api/position/', {});
  }
  /* position requests end */
  auth(newLogin: any, newPassword: any): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: newLogin,
      password: newPassword
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {});
  }
  getUserApplications(pk: number): Promise<IUserApplication[]> {
     return this.get(`http://localhost:8000/api/user-applications/filter/${pk}/`, {});
  }

  getStatuses(): Promise<IStatus[]> {
    return this.get('http://localhost:8000/api/status/', {});
  }

  createUserApplication(iposition: IPosition, icomment: any, recruiter: any): Promise<IUserApplication> {
    console.log('createuserapplication request');
    return this.post('http://localhost:8000/api/user-applications/', {
      position: iposition.id,
      comment: icomment,
      recruiter_contact: recruiter
    });
  }
}
