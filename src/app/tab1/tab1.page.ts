import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { DataService, User8792009665 } from '../services/data.services';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  user8792009665 : User8792009665[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getUser8792009665().subscribe(res => {
      console.log(res);
      this.user8792009665 = res;
    });
  }

  getRecommendation() {
    var i;
    var smallestDifference = 1.797693134862315E+308;
    var difference = 0;
    var indexClosestToUser = 0;
    var additionalStepsNeeded = 0; 

    /*for (i = 1; i < this.daily.length; i++) {
      difference = Math.abs(parseInt(this.daily[i].LoggedActivitiesDistance) - parseInt(this.user[0].LoggedActivitiesDistance));
      difference += Math.abs(parseInt(this.daily[i].TrackerDistance) - parseInt(this.user[0].TrackerDistance));

      
      if (difference < smallestDifference) {
        difference = smallestDifference;
        indexClosestToUser = i;
        additionalStepsNeeded = parseInt(this.daily[indexClosestToUser].StepTotal) - parseInt(this.user[0].StepTotal);
      }
    }*/

    return additionalStepsNeeded;
  }
}
