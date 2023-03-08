import { Component } from '@angular/core';
import { DataService, User8792009665 } from '../services/data.services';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  user8792009665 : User8792009665[] = [];


  constructor(private dataService: DataService) {

    this.dataService.getUser8792009665().subscribe(res => {
      console.log(res);
      this.user8792009665 = res;
    });
  }

}
