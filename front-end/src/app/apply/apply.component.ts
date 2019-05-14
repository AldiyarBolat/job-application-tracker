import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../services/provider.service';
import {IPosition, IUserApplication} from '../models/models';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  positions: IPosition[] = [];
  chosenPosition: IPosition;
  recruiterContact = '';
  comment = '';
  public logged = false;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    console.log('Token:' + token);
    if (token) {
      this.logged = true;
    }
    if (this.logged) {
      this.provider.getPositions().then(res => {
        this.positions = res;
        console.log('get positions response has delivered');
      });
    }
  }
  choosePosition(position: IPosition) {
    this.chosenPosition = position;
  }
  createUserApplication() {
    console.log(this.chosenPosition + ' ' + this.comment + ' ' + this.recruiterContact);
    this.provider.createUserApplication(this.chosenPosition, this.comment, this.recruiterContact).then(res => {
      console.log('createuserApplication response received');
      this.comment = '';
      this.recruiterContact = '';
    });
  }

}
