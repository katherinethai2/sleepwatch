import { Component } from '@angular/core';
import { DataService, User } from '../services/data.services';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user : User[] = [];

  constructor(private dataService: DataService) {

    this.dataService.getUser().subscribe(res => {
      console.log(res);
      this.user = res;
    });
  }

}
