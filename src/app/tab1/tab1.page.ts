import { Component } from '@angular/core';
import { DataService, Note } from '../services/data.services';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  notes : Note[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getNotes().subscribe(res => {
      console.log(res);
      this.notes = res;
    });
  }


}
