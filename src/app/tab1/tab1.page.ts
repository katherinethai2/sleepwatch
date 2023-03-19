import { Component, OnInit, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { DataService, User } from '../services/data.services';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient, } from '@angular/common/http';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page  {
  id:string = '';

  constructor(private dataService: DataService, private http: HttpClient, private navCtrl: NavController, private DataService:DataService) {
  }

  getID() {
    this.dataService.setID(this.id);
  }
}
