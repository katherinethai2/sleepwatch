import { Component, OnInit, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { DataService, User } from '../services/data.services';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient, } from '@angular/common/http';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  user : User[] = [];
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
  data = new Array<any>();

  message = '';
  messages = [];
  currentUser = '';

  obj:any;
  index = 0;

  id:string = '';

  recommendation:any;
  feature:any;
  grad:any;
  feature0: any;
  feature1: any;
  feature2: any;
  feature3: any;
  feature4: any;

  increase0: any;
  increase3: any;
  increase1: any;
  increase2: any;
  increase4: any;

  sport0: any;
  sport1: any;
  sport2: any;

  constructor(private dataService: DataService, private http: HttpClient, private navCtrl: NavController, private DataService:DataService) {
    this.dataService.getUser().subscribe(async res => {
      //console.log(res);
      this.user = res;
      console.log(this.DataService.name);

      for (var i in this.user) {
        this.scores.push([this.getTotalStepsScore(this.user[i].TotalSteps), 
          this.getTotalDistanceScore(this.user[i].TotalDistance),
          this.getTrackerDistanceScore(this.user[i].TrackerDistance),
          this.getLoggedActivitiesDistanceScore(this.user[i].LoggedActivitiesDistance),
          this.getVeryActiveDistanceScore(this.user[i].VeryActiveDistance_x),
          this.getModeratelyActiveDistanceScore(this.user[i].ModeratelyActiveDistance_x),
          this.getLightActiveDistanceScore(this.user[i].LightActiveDistance_x),
          this.getSedentaryActiveDistanceScore(this.user[i].SedentaryActiveDistance_x),
          this.getVeryActiveMinutesScore(this.user[i].VeryActiveMinutes_x),
          this.getFairlyActiveMinutesScore(this.user[i].FairlyActiveMinutes_y),
          this.getLightlyActiveMinutesScore(this.user[i].LightlyActiveMinutes_y),
          this.getSedentaryMinutesScore(this.user[i].SedentaryMinutes_y),
          this.getCaloriesScore(this.user[i].Calories_x),
          this.getStepTotalScore(this.user[i].StepTotal)
        ]);
      }

      console.log(this.scores);

      for (let j = 0; j < this.scores.length; ++j) {
        console.log("NEW DAY " + this.user[j].date);
        for (let i = 0; i < this.scores[j].length; ++i) {
          const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

          if (i == 0) {
            this.data = [this.getTotalStepsScore(parseInt(this.user[this.index].TotalSteps) / 1440), 
              this.getTotalDistanceScore(parseInt(this.user[this.index].TotalDistance) / 1440),
              this.getTrackerDistanceScore(parseInt(this.user[this.index].TrackerDistance) / 1440),
              this.getLoggedActivitiesDistanceScore(parseInt(this.user[this.index].LoggedActivitiesDistance) / 1440),
              this.getVeryActiveDistanceScore(parseInt(this.user[this.index].VeryActiveDistance_x) / 1440),
              this.getModeratelyActiveDistanceScore(parseInt(this.user[this.index].ModeratelyActiveDistance_x) / 1440),
              this.getLightActiveDistanceScore(parseInt(this.user[this.index].LightActiveDistance_x) / 1440),
              this.getSedentaryActiveDistanceScore(parseInt(this.user[this.index].SedentaryActiveDistance_x) / 1440),
              this.getVeryActiveMinutesScore(parseInt(this.user[this.index].VeryActiveMinutes_x) / 1440),
              this.getFairlyActiveMinutesScore(parseInt(this.user[this.index].FairlyActiveMinutes_y) / 1440),
              this.getLightlyActiveMinutesScore(parseInt(this.user[this.index].LightlyActiveMinutes_y) / 1440),
              this.getSedentaryMinutesScore(parseInt(this.user[this.index].SedentaryMinutes_y) / 1440),
              this.getCaloriesScore(parseInt(this.user[this.index].Calories_x) / 1440),
              this.getStepTotalScore(parseInt(this.user[this.index].StepTotal) / 1440)];
            console.log(i);
            console.log(this.data);
            this.sendToBackend(this.data);
          } else {
            this.data = [];

            if ((parseInt(this.user[this.index].TotalSteps) / 2) != 0) {
              this.data.push(this.getTotalStepsScore(parseInt(this.user[this.index].TotalSteps) / (1440 - (5 * i + this.random(500)))));
            } else {
              this.data.push(this.getTotalStepsScore((parseInt(this.user[this.index].TotalSteps) / 2)));
            }

            if ((parseInt(this.user[this.index].TotalDistance) / 2) != 0) {
              this.data.push(this.getTotalDistanceScore((parseInt(this.user[this.index].TotalDistance) / (1440 - (5 * i + this.random(500))))));
            } else {
              this.data.push(this.getTotalDistanceScore(parseInt(this.user[this.index].TotalDistance) / 2));
            }

            if ((parseInt(this.user[this.index].TrackerDistance) / 2) != 0) {
              this.data.push(this.getTrackerDistanceScore((parseInt(this.user[this.index].TrackerDistance) / (1440 - (5 * i + this.random(500))))));
            } else {
              this.data.push(this.getTrackerDistanceScore((parseInt(this.user[this.index].TrackerDistance) / 2)));
            }

            if ((parseInt(this.user[this.index].LoggedActivitiesDistance) / 2) != 0) {
              this.data.push(this.getLoggedActivitiesDistanceScore((parseInt(this.user[this.index].LoggedActivitiesDistance) / (1440 - (5 * i + this.random(500))))));
            } else {
              this.data.push(this.getLoggedActivitiesDistanceScore((parseInt(this.user[this.index].LoggedActivitiesDistance) / 2)));
            }

            if ((parseInt(this.user[this.index].VeryActiveDistance_x) / 2) != 0) {
              this.data.push(this.getVeryActiveDistanceScore((parseInt(this.user[this.index].VeryActiveDistance_x) / (1440 - (5 * i + this.random(500))))));
            } else {
              this.data.push(this.getVeryActiveDistanceScore((parseInt(this.user[this.index].VeryActiveDistance_x) / 2)));
            }

            if ((parseInt(this.user[this.index].ModeratelyActiveDistance_x) / 2) != 0) {
              this.data.push(this.getModeratelyActiveDistanceScore((parseInt(this.user[this.index].ModeratelyActiveDistance_x) / (1440 - (5 * i + this.random(500))))));
            } else {
              this.data.push(this.getModeratelyActiveDistanceScore((parseInt(this.user[this.index].ModeratelyActiveDistance_x) / 2)));
            }

            if ((parseInt(this.user[this.index].LightActiveDistance_x) / 2) != 0) {
              this.data.push(this.getLightActiveDistanceScore((parseInt(this.user[this.index].LightActiveDistance_x) / (1440 - (5 * i + this.random(500))))));
            } else {
              this.data.push(this.getLightActiveDistanceScore((parseInt(this.user[this.index].LightActiveDistance_x) / 2)));
            }

            if ((parseInt(this.user[this.index].SedentaryActiveDistance_x) / 2) != 0) {
              this.data.push(this.getSedentaryActiveDistanceScore((parseInt(this.user[this.index].SedentaryActiveDistance_x) / (1440 - (5 * i + this.random(500))))));
            } else {
              this.data.push(this.getSedentaryActiveDistanceScore((parseInt(this.user[this.index].SedentaryActiveDistance_x) / 2)));
            }

            if ((parseInt(this.user[this.index].VeryActiveMinutes_x) / 2) != 0) {
              this.data.push(this.getVeryActiveMinutesScore((parseInt(this.user[this.index].VeryActiveMinutes_x) / (1440 - (5 * i + this.random(500))))));
            } else {
              this.data.push(this.getVeryActiveMinutesScore((parseInt(this.user[this.index].VeryActiveMinutes_x) / 2)));
            }

            if ((parseInt(this.user[this.index].FairlyActiveMinutes_y) / 2) != 0) {
              this.data.push(this.getFairlyActiveMinutesScore((parseInt(this.user[this.index].FairlyActiveMinutes_y) / (1440 - (5 * i + this.random(500))))));
            } else {
              this.data.push(this.getFairlyActiveMinutesScore((parseInt(this.user[this.index].FairlyActiveMinutes_y) / 2)));
            }

            if ((parseInt(this.user[this.index].LightlyActiveMinutes_y) / 2) != 0) {
              this.data.push(this.getLightlyActiveMinutesScore((parseInt(this.user[this.index].LightlyActiveMinutes_y) / (1440 - (5 * i + this.random(500))))));
            } else {
              this.data.push(this.getLightlyActiveMinutesScore((parseInt(this.user[this.index].LightlyActiveMinutes_y) / 2)));
            }

            if ((parseInt(this.user[this.index].SedentaryMinutes_y) / 2) != 0) {
              this.data.push(this.getSedentaryMinutesScore((parseInt(this.user[this.index].SedentaryMinutes_y) / (1440 - (5 * i + this.random(500))))));
            } else {
              this.data.push(this.getSedentaryMinutesScore((parseInt(this.user[this.index].SedentaryMinutes_y) / 2)));
            }

            if ((parseInt(this.user[this.index].Calories_x) / 2) != 0) {
              this.data.push(this.getCaloriesScore((parseInt(this.user[this.index].Calories_x) / (1440 - (5 * i + this.random(500))))));
            } else {
              this.data.push(this.getCaloriesScore((parseInt(this.user[this.index].Calories_x) / 2)));
            }

            if ((parseInt(this.user[this.index].StepTotal) / 2) != 0) {
              this.data.push(this.getStepTotalScore((parseInt(this.user[this.index].StepTotal) / (1440 - (5 * i + this.random(500))))));
            } else {
              this.data.push(this.getStepTotalScore((parseInt(this.user[this.index].StepTotal) / 2)));
            }

            await sleep(10000); // 10 seconds right now
            console.log(i);
            console.log(this.data);
            this.sendToBackend(this.data);
            console.log("recommendation");
            console.log(this.recommendation);
            console.log("feature");
            this.feature0 = this.getFeature(this.recommendation['return'][0]['features'][0]['feature']);
            this.feature1 = this.getFeature(this.recommendation['return'][0]['features'][1]['feature']);
            this.feature2 = this.getFeature(this.recommendation['return'][0]['features'][2]['feature']);
            this.feature3 = this.getFeature(this.recommendation['return'][0]['features'][3]['feature']);
            this.feature4 = this.getFeature(this.recommendation['return'][0]['features'][4]['feature']);

            this.increase0 = this.getIncreaseOrDecrease(this.recommendation['return'][0]['features'][0]['increase']);
            this.increase1 = this.getIncreaseOrDecrease(this.recommendation['return'][0]['features'][1]['increase']);
            this.increase2 = this.getIncreaseOrDecrease(this.recommendation['return'][0]['features'][2]['increase']);
            this.increase3 = this.getIncreaseOrDecrease(this.recommendation['return'][0]['features'][3]['increase']);
            this.increase4 = this.getIncreaseOrDecrease(this.recommendation['return'][0]['features'][4]['increase']);

            this.sport0 = this.getSport(this.recommendation['return'][0]['spots'][0]['spot']);
            this.sport1 = this.getSport(this.recommendation['return'][0]['spots'][1]['spot']);
            this.sport2 = this.getSport(this.recommendation['return'][0]['spots'][2]['spot']);
          }
        }
      }
    });
  }

  async sendToBackend(data:any) {
    this.http.post("http://127.0.0.1:8000/men/", data).subscribe((res) => {
      console.log("result");
      this.recommendation = res;
      console.log(res);
    })

    /*this.obj = await this.http.get("http://127.0.0.1:8000/men/").subscribe(
      data => this.obj = data
    )

    console.log(new Date().toLocaleString());*/

  }

  ngOnInit() {
    /*this.obj = this.http.get("http://127.0.0.1:8000/men/").subscribe(
      data => this.obj = data
    )*/

    /*this.http.post("http://127.0.0.1:8000/men/", this.scores).subscribe((res) => {
      console.log(res);
    })*/
  }


  async showToast(msg: string) {
    /*let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();*/
  }

  random(max: number) {
    return Math.floor(Math.random() * max);
  }

  getFeature(feature: any) {
    if (feature == "TotalSteps") {
      return "Total Steps";
    } else if (feature == "TotalDistance") {
      return "Total Distance";
    } else if (feature == "TrackerDistance")  {
      return "Tracker Distance";
    } else if (feature == "LoggedActivitiesDistance") {
      return "Logged Activites Distance";
    } else if (feature == "VeryActiveDistance") {
      return "Very Active Distance";
    } else if (feature == "ModeratelyActiveDistance") {
      return "Moderately Active Distance";
    } else if (feature == "LightActiveDistance") {
      return "Light Active Distance";
    } else if (feature == "SedentaryActiveDistance") {
      return "Sedentary Active Distance";
    } else if (feature == "VeryActiveMinutes") {
      return "Very Active Minutes";
    } else if (feature == "Calories") {
      return "Calories";
    } else if (feature == "SedentaryMinutes") {
      return "Sedentary Minutes";
    } else if (feature == "LightlyActiveMinutes") {
      return "Lightly Active Minutes";
    } else if (feature == "FairlyActiveMinutes") {
      return "Fairly Active Minutes";
    } else if (feature == "StepTotal") {
      return "Step Total";
    }

    return "ERROR feature " + feature;
  }

  getIncreaseOrDecrease(increase:any) {
    if (increase == true) {
      return "Increase";
    } else if (increase == false) {
      return "Decrease";
    }

    return "ERROR increase " + increase;
  }

  getSport(sport: any) {
    if (sport == "running") {
      return "Run";
    } else if (sport == "walking slowly") {
      return "Walk Slowly";
    } else if (sport == "walking brisk") {
      return "Walk Briskly";
    } else if (sport == "bicycling") {
      return "Bike";
    } else if (sport == "sitting") {
      return "Sit";
    } else if (sport == "fishing") {
      return "Fish";
    } else if (sport == "hiking") {
      return "Hike";
    } else if (sport == "basketball") {
      return "Basketball";
    }
    
    return "ERROR sport " + sport;
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

  getID() {
    this.dataService.setID(this.id);
  }
}