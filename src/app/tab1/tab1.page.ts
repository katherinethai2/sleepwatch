import { Component, OnInit, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { DataService, User8792009665 } from '../services/data.services';
import {PythonShell} from 'python-shell';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import * as child from 'child_process';

import { HttpClient, } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  user8792009665 : User8792009665[] = [];
  totalStepsMean : any = null;
  totalStepsChi : any = null;
  totalDistanceMean : any = null;
  totalDistanceChi : any = null;
  trackerDistanceMean : any = null;
  trackerDistanceChi : any = null;
  loggedActivitiesDistanceMean : any = null;
  loggedActivitiesDistanceChi : any = null;
  veryActiveDistanceMean : any = null;
  veryActiveDistanceChi : any = null;
  moderatelyActiveDistanceMean : any = null;
  moderatelyActiveDistanceChi : any = null;
  lightActiveDistanceMean : any = null;
  lightActiveDistanceChi : any = null;
  sedentaryActiveDistanceMean : any = null;
  sedentaryActiveDistanceChi : any = null;
  veryActiveMinutesMean : any = null;
  veryActiveMinutesChi : any = null;
  fairlyActiveMinutesMean : any = null;
  fairlyActiveMinutesChi : any = null;
  lightlyActiveMinutesMean : any = null;
  lightlyActiveMinutesChi : any = null;
  sedentaryMinutesMean : any = null;
  sedentaryMinutesChi : any = null;
  caloriesMean : any = null;
  caloriesChi : any = null;
  stepTotalMean : any = null;
  stepTotalChi : any = null;

  a = 0.1;

  scores = new Array<any>();

  message = '';
  messages = [];
  currentUser = '';

  obj:any;

  constructor(private dataService: DataService, private http: HttpClient) {//, private socket: Socket, private toastCtrl: ToastController) {
    this.dataService.getUser8792009665().subscribe(res => {
      //console.log(res);
      this.user8792009665 = res;

      var count = 0;
      for (var i in this.user8792009665) {
        this.scores.push([this.getTotalStepsScore(this.user8792009665[i].TotalSteps), 
          this.getTotalDistanceScore(this.user8792009665[i].TotalDistance),
          this.getTrackerDistanceScore(this.user8792009665[i].TrackerDistance),
          this.getLoggedActivitiesDistanceScore(this.user8792009665[i].LoggedActivitiesDistance),
          this.getVeryActiveDistanceScore(this.user8792009665[i].VeryActiveDistance_x),
          this.getModeratelyActiveDistanceScore(this.user8792009665[i].ModeratelyActiveDistance_x),
          this.getLightActiveDistanceScore(this.user8792009665[i].LightActiveDistance_x),
          this.getSedentaryActiveDistanceScore(this.user8792009665[i].SedentaryActiveDistance_x),
          this.getVeryActiveMinutesScore(this.user8792009665[i].VeryActiveMinutes_x),
          this.getFairlyActiveMinutesScore(this.user8792009665[i].FairlyActiveMinutes_y),
          this.getLightlyActiveMinutesScore(this.user8792009665[i].LightlyActiveMinutes_y),
          this.getSedentaryMinutesScore(this.user8792009665[i].SedentaryMinutes_y),
          this.getCaloriesScore(this.user8792009665[i].Calories_x),
          this.getStepTotalScore(this.user8792009665[i].StepTotal)
        ]);
        count += 1;
      }


      
    });
  }
  
  ngOnInit() {
    this.obj = this.http.get("http://127.0.0.1:8000/men/").subscribe(
      data => this.obj = data
    )
  }

  async showToast(msg: string) {
    /*let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();*/
  }

  getTotalStepsScore(x: any) {
    if (x == undefined) {
      return this.totalStepsMean;
    }
    
    if (this.totalStepsMean != null) {
      this.totalStepsMean = (1 - this.a) * this.totalStepsMean + this.a * x;
    } else {
      this.totalStepsMean = x;
    }

    if (this.totalStepsChi != null) {
      this.totalStepsChi = (1 - this.a) * this.totalStepsChi + this.a * x ** 2;
    } else {
      this.totalStepsChi = x ** 2;
    }

    let std = Math.sqrt(this.totalStepsChi - this.totalStepsMean ** 2);

    if (std > 0) {
      return (x - this.totalStepsMean) / std;
    } else {
      return x - this.totalStepsMean;
    }
  }

  getTotalDistanceScore(x: any) {
    if (x == undefined) {
      return this.totalDistanceMean;
    }

    if (this.totalDistanceMean != null) {
      this.totalDistanceMean = (1 - this.a) * this.totalDistanceMean + this.a * x;
    } else {
      this.totalDistanceMean = x;
    }

    if (this.totalDistanceChi != null) {
      this.totalDistanceChi = (1 - this.a) * this.totalDistanceChi + this.a * x ** 2;
    } else {
      this.totalDistanceChi = x ** 2;
    }

    let std = Math.sqrt(this.totalDistanceChi - this.totalDistanceMean ** 2);

    if (std > 0) {
      return (x - this.totalDistanceMean) / std;
    } else {
      return x - this.totalDistanceMean;
    }
  }

  getTrackerDistanceScore(x: any) {
    if (x == undefined) {
      return this.trackerDistanceMean;
    }

    if (this.trackerDistanceMean != null) {
      this.trackerDistanceMean= (1 - this.a) * this.trackerDistanceMean + this.a * x;
    } else {
      this.trackerDistanceMean = x;
    }

    if (this.trackerDistanceChi != null) {
      this.trackerDistanceChi = (1 - this.a) * this.trackerDistanceChi + this.a * x ** 2;
    } else {
      this.trackerDistanceChi = x ** 2;
    }

    let std = Math.sqrt(this.trackerDistanceChi - this.trackerDistanceMean ** 2);

    if (std > 0) {
      return (x - this.trackerDistanceMean) / std;
    } else {
      return x - this.trackerDistanceMean;
    }
  }

  getLoggedActivitiesDistanceScore(x: any) {
    if (x == undefined) {
      return this.loggedActivitiesDistanceMean;
    }

    if (this.loggedActivitiesDistanceMean != null) {
      this.loggedActivitiesDistanceMean = (1 - this.a) * this.loggedActivitiesDistanceMean + this.a * x;
    } else {
      this.loggedActivitiesDistanceMean = x;
    }

    if (this.loggedActivitiesDistanceChi != null) {
      this.loggedActivitiesDistanceChi = (1 - this.a) * this.loggedActivitiesDistanceChi + this.a * x ** 2;
    } else {
      this.loggedActivitiesDistanceChi = x ** 2;
    }

    let std = Math.sqrt(this.loggedActivitiesDistanceChi - this.loggedActivitiesDistanceMean ** 2);

    if (std > 0) {
      return (x - this.loggedActivitiesDistanceMean) / std;
    } else {
      return x - this.loggedActivitiesDistanceMean;
    }
  }

  getVeryActiveDistanceScore(x: any) {
    if (x == undefined) {
      return this.veryActiveDistanceMean;
    }

    if (this.veryActiveDistanceMean != null) {
      this.veryActiveDistanceMean = (1 - this.a) * this.veryActiveDistanceMean + this.a * x;
    } else {
      this.veryActiveDistanceMean = x;
    }

    if (this.veryActiveDistanceChi != null) {
      this.veryActiveDistanceChi = (1 - this.a) * this.veryActiveDistanceChi + this.a * x ** 2;
    } else {
      this.veryActiveDistanceChi = x ** 2;
    }

    let std = Math.sqrt(this.veryActiveDistanceChi - this.veryActiveDistanceMean ** 2);

    if (std > 0) {
      return (x - this.veryActiveDistanceMean) / std;
    } else {
      return x - this.veryActiveDistanceMean;
    }
  }

  getModeratelyActiveDistanceScore(x: any) {
    if (x == undefined) {
      return this.moderatelyActiveDistanceMean;
    }

    if (this.moderatelyActiveDistanceMean != null) {
      this.moderatelyActiveDistanceMean = (1 - this.a) * this.moderatelyActiveDistanceMean + this.a * x;
    } else {
      this.moderatelyActiveDistanceMean = x;
    }

    if (this.moderatelyActiveDistanceChi != null) {
      this.moderatelyActiveDistanceChi = (1 - this.a) * this.moderatelyActiveDistanceChi + this.a * x ** 2;
    } else {
      this.moderatelyActiveDistanceChi = x ** 2;
    }

    let std = Math.sqrt(this.moderatelyActiveDistanceChi - this.moderatelyActiveDistanceMean ** 2);

    if (std > 0) {
      return (x - this.moderatelyActiveDistanceMean) / std;
    } else {
      return x - this.moderatelyActiveDistanceMean;
    }
  }

  getLightActiveDistanceScore(x: any) {
    if (x == undefined) {
      return this.lightActiveDistanceMean;
    }

    if (this.lightActiveDistanceMean != null) {
      this.lightActiveDistanceMean = (1 - this.a) * this.lightActiveDistanceMean + this.a * x;
    } else {
      this.lightActiveDistanceMean = x;
    }

    if (this.lightActiveDistanceChi != null) {
      this.lightActiveDistanceChi = (1 - this.a) * this.lightActiveDistanceChi + this.a * x ** 2;
    } else {
      this.lightActiveDistanceChi = x ** 2;
    }

    let std = Math.sqrt(this.lightActiveDistanceChi- this.lightActiveDistanceMean ** 2);

    if (std > 0) {
      return (x - this.lightActiveDistanceMean) / std;
    } else {
      return x - this.lightActiveDistanceMean;
    }
  }

  getSedentaryActiveDistanceScore(x: any) {
    if (x == undefined) {
      return this.sedentaryActiveDistanceMean;
    }

    if (this.sedentaryActiveDistanceMean != null) {
      this.sedentaryActiveDistanceMean = (1 - this.a) * this.sedentaryActiveDistanceMean + this.a * x;
    } else {
      this.sedentaryActiveDistanceMean = x;
    }

    if (this.sedentaryActiveDistanceChi != null) {
      this.sedentaryActiveDistanceChi = (1 - this.a) * this.sedentaryActiveDistanceChi + this.a * x ** 2;
    } else {
      this.sedentaryActiveDistanceChi= x ** 2;
    }

    let std = Math.sqrt(this.sedentaryActiveDistanceChi - this.sedentaryActiveDistanceMean ** 2);

    if (std > 0) {
      return (x - this.sedentaryActiveDistanceMean) / std;
    } else {
      return x - this.sedentaryActiveDistanceMean;
    }
  }

  getVeryActiveMinutesScore(x: any) {
    if (x == undefined) {
      return this.veryActiveMinutesMean;
    }

    if (this.veryActiveMinutesMean != null) {
      this.veryActiveMinutesMean = (1 - this.a) * this.veryActiveMinutesMean + this.a * x;
    } else {
      this.veryActiveMinutesMean = x;
    }

    if (this.veryActiveMinutesChi != null) {
      this.veryActiveMinutesChi = (1 - this.a) * this.veryActiveMinutesChi + this.a * x ** 2;
    } else {
      this.veryActiveMinutesChi = x ** 2;
    }

    let std = Math.sqrt(this.veryActiveMinutesChi - this.veryActiveMinutesMean ** 2);

    if (std > 0) {
      return (x - this.veryActiveMinutesMean) / std;
    } else {
      return x - this.veryActiveMinutesMean;
    }
  }

  getFairlyActiveMinutesScore(x: any) {
    if (x == undefined) {
      return this.fairlyActiveMinutesMean;
    }

    if (this.fairlyActiveMinutesMean != null) {
      this.fairlyActiveMinutesMean = (1 - this.a) * this.fairlyActiveMinutesMean + this.a * x;
    } else {
      this.fairlyActiveMinutesMean = x;
    }

    if (this.fairlyActiveMinutesChi != null) {
      this.fairlyActiveMinutesChi = (1 - this.a) * this.fairlyActiveMinutesChi + this.a * x ** 2;
    } else {
      this.fairlyActiveMinutesChi = x ** 2;
    }

    let std = Math.sqrt(this.fairlyActiveMinutesChi - this.fairlyActiveMinutesMean ** 2);

    if (std > 0) {
      return (x - this.fairlyActiveMinutesMean) / std;
    } else {
      return x - this.fairlyActiveMinutesMean;
    }
  }

  getLightlyActiveMinutesScore(x: any) {
    if (x == undefined) {
      return this.lightlyActiveMinutesMean;
    }

    if (this.lightlyActiveMinutesMean != null) {
      this.lightlyActiveMinutesMean = (1 - this.a) * this.lightlyActiveMinutesMean + this.a * x;
    } else {
      this.lightlyActiveMinutesMean = x;
    }

    if (this.lightlyActiveMinutesChi != null) {
      this.lightlyActiveMinutesChi = (1 - this.a) * this.lightlyActiveMinutesChi + this.a * x ** 2;
    } else {
      this.lightlyActiveMinutesChi = x ** 2;  
    }

    let std = Math.sqrt(this.lightlyActiveMinutesChi - this.lightlyActiveMinutesMean** 2);

    if (std > 0) {
      return (x - this.lightlyActiveMinutesMean) / std;
    } else {
      return x - this.lightlyActiveMinutesMean;
    }
  }

  getSedentaryMinutesScore(x: any) {
    if (x == undefined) {
      return this.sedentaryMinutesMean;
    }

    if (this.sedentaryMinutesMean != null) {
      this.sedentaryMinutesMean = (1 - this.a) * this.sedentaryMinutesMean + this.a * x;
    } else {
      this.sedentaryMinutesMean = x;
    }

    if (this.sedentaryMinutesChi != null) {
      this.sedentaryMinutesChi = (1 - this.a) * this.sedentaryMinutesChi + this.a * x ** 2;
    } else {
      this.sedentaryMinutesChi = x ** 2;
    }

    let std = Math.sqrt(this.sedentaryMinutesChi - this.sedentaryMinutesMean ** 2);

    if (std > 0) {
      return (x - this.sedentaryMinutesMean) / std;
    } else {
      return x - this.sedentaryMinutesMean;
    }
  }

  getCaloriesScore(x: any) {
    if (x == undefined) {
      return this.caloriesMean;
    }

    if (this.caloriesMean != null) {
      this.caloriesMean = (1 - this.a) * this.caloriesMean + this.a * x;
    } else {
      this.caloriesMean = x;
    }

    if (this.caloriesChi != null) {
      this.caloriesChi = (1 - this.a) * this.caloriesChi + this.a * x ** 2;
    } else {
      this.caloriesChi = x ** 2;
    }

    let std = Math.sqrt(this.caloriesChi - this.caloriesMean ** 2);

    if (std > 0) {
      return (x - this.caloriesMean) / std;
    } else {
      return x - this.caloriesMean;
    }
  }

  getStepTotalScore(x: any) {
    if (x == undefined) {
      return this.stepTotalMean;
    }

    if (this.stepTotalMean != null) {
      this.stepTotalMean = (1 - this.a) * this.stepTotalMean + this.a * x;
    } else {
      this.stepTotalMean = x;
    }

    if (this.stepTotalChi != null) {
      this.stepTotalChi = (1 - this.a) * this.stepTotalChi + this.a * x ** 2;
    } else {
      this.stepTotalChi = x ** 2;
    }

    let std = Math.sqrt(this.stepTotalChi- this.stepTotalMean ** 2);

    if (std > 0) {
      return (x - this.stepTotalMean) / std;
    } else {
      return x - this.stepTotalMean;
    }
  }
  

  getRecommendation() {
    return 0
  }
}

function anExampleFunction() {
  /*exec('python3 app.py', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
    }
    else if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    else {
      console.log(stdout);
    }
  })*/
}