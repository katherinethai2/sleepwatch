import { Component } from '@angular/core';
import { DataService, Note } from '../services/data.services';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  notes : Note[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getNotes().subscribe(res => {
      console.log(res);
      this.notes = res;
    });
  }

}
