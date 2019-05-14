import {Component, Input, OnInit} from '@angular/core';
import {ProviderService} from '../services/provider.service';
import {IStatus, IUserApplication} from '../models/models';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  @Input() status: IStatus;
  constructor(private provider: ProviderService) { }
  userApplications: IUserApplication[];
  choosenUserApplication: IUserApplication;
  selectedUserApplicationStatus: number;
  statuses: IStatus[];
  public logged = false;

  ngOnInit() {
    const token = localStorage.getItem('token');
    console.log('Token:' + token);
    if (token) {
      this.logged = true;
    }

    if (this.logged) {
      this.provider.getStatuses().then(res => {
        this.statuses = res;
      });
      this.provider.getUserApplications(this.status.id).then(res => {
        this.userApplications = res;
      });
    }
  }

  chooseApplication(userApplication: IUserApplication) {
    this.choosenUserApplication = userApplication;
  }
  changeUserApplication() {
    this.provider.updateUserApplication(this.choosenUserApplication.id, this.selectedUserApplicationStatus);
  }



}
