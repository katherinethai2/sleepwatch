import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Tab1Page } from '../tab1/tab1.page';

export interface User{
    id?: string;
    date: string;
    TotalSteps: string;
    TotalDistance: string;
    TrackerDistance: string;
    LoggedActivitiesDistance: string;
    VeryActiveDistance_x: string;
    ModeratelyActiveDistance_x: string;
    LightActiveDistance_x: string;
    SedentaryActiveDistance_x: string;
    VeryActiveMinutes_x: string;
    Calories_x: string;
    Calories_y: string;
    SedentaryMinutes_y: string;
    LightlyActiveMinutes_y: string;
    FairlyActiveMinutes_y: string;
    VeryActiveMinutes_y: string;
    SedentaryActiveDistance_y: string;
    LightActiveDistance_y: string;
    ModeratelyActiveDistance_y: string;
    VeryActiveDistance_y: string;
    StepTotal: string;
    TotalSleepRecords: string;
    TotalMinutesAsleep: string;
    TotalTimeInBed: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    name:string = '';

    constructor(private firestore: Firestore) {
    }

    getUser(): Observable<User[]>{ 
        const userRef = collection(this.firestore, this.name);
        return collectionData(userRef, { idField: 'id'}) as Observable<User[]>; 
    }

    getUserById(id: User): Observable<User> {
        const userDocRef = doc(this.firestore,  this.name += '/${id}');
        return docData(userDocRef, { idField: 'id' }) as Observable<User>;
    }

    /*
    addUser(user: User) {
        const userRef = collection(this.firestore, 'user8792009665');
        return addDoc(userRef, user);
    }

    deleteUser(user: User) {
        const userDocRef = doc(this.firestore, 'user8792009665/${user8792009665.id');
        return deleteDoc(userDocRef);
    }

    updateUser(user: User) {
        const userDocRef = doc(this.firestore, 'user8792009665/${user8792009665.id}');
        return updateDoc(userDocRef, { date: user.date, TotalSteps: user.TotalSteps, TotalDistance: user.TotalDistance, TrackerDistance: user.TrackerDistance, LoggedActivitiesDistance: user.LoggedActivitiesDistance, VeryActiveDistance_x: user.VeryActiveDistance_x, ModeratelyActiveDistance_x: user.ModeratelyActiveDistance_x, LightActiveDistance_x: user.LightActiveDistance_x, SedentaryActiveDistance_x: user.SedentaryActiveDistance_x, VeryActiveMinutes_x: user.VeryActiveMinutes_x, Calories_x: user.Calories_x, Calories_y: user.Calories_y, SedentaryMinutes_y: user.SedentaryMinutes_y, LightlyActiveMinutes_y: user.LightlyActiveMinutes_y, FairlyActiveMinutes_y: user.FairlyActiveMinutes_y, VeryActiveMinutes_y: user.VeryActiveMinutes_y, SedentaryActiveDistance_y: user.SedentaryActiveDistance_y, LightActiveDistance_y: user.LightActiveDistance_y, ModeratelyActiveDistance_y: user.ModeratelyActiveDistance_y, VeryActiveDistance_y: user.VeryActiveDistance_y, StepTotal: user.StepTotal, TotalSleepRecords: user.TotalSleepRecords, TotalMinutesAsleep: user.TotalMinutesAsleep, TotalTimeInBed: user.TotalTimeInBed  });
    }*/

    setID(id: any) {
        this.name = "user" + id;
        alert(this.name);
    }
}