import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../services/provider.service';
import {IStatus} from '../models/models';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  token: any;
  statuses: IStatus[];
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.provider.getStatuses().then(res => {
      this.statuses = res;
    });
  }

}
