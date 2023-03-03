import { Component } from '@angular/core';
import { DataService, Note, User } from '../services/data.services';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  notes : Note[] = [];
  user : User[] = [];


  constructor(private dataService: DataService) {
    this.dataService.getNotes().subscribe(res => {
      this.notes = res;
    });

    this.dataService.getUser().subscribe(res => {
      console.log(res);
      this.user = res;
    });
  }

}
