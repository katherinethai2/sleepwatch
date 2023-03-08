import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface User8792009665 {
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
    constructor(private firestore: Firestore) {}

    getUser8792009665(): Observable<User8792009665[]>{ 
        const user8792009665Ref = collection(this.firestore, 'user8792009665');
        return collectionData(user8792009665Ref, { idField: 'id'}) as Observable<User8792009665[]>; 
    }

    getUser8792009665ById(id: User8792009665): Observable<User8792009665> {
        const user8792009665DocRef = doc(this.firestore, 'user8792009665/${id}');
        return docData(user8792009665DocRef, { idField: 'id' }) as Observable<User8792009665>;
    }

    addUser8792009665(user8792009665: User8792009665) {
        const user8792009665Ref = collection(this.firestore, 'user8792009665');
        return addDoc(user8792009665Ref, user8792009665);
    }

    deleteUser8792009665(user8792009665: User8792009665) {
        const user8792009665DocRef = doc(this.firestore, 'user8792009665/${user8792009665.id');
        return deleteDoc(user8792009665DocRef);
    }

    updateUser8792009665(user8792009665: User8792009665) {
        const user8792009665DocRef = doc(this.firestore, 'user8792009665/${user8792009665.id}');
        return updateDoc(user8792009665DocRef, { date: user8792009665.date, TotalSteps: user8792009665.TotalSteps, TotalDistance: user8792009665.TotalDistance, TrackerDistance: user8792009665.TrackerDistance, LoggedActivitiesDistance: user8792009665.LoggedActivitiesDistance, VeryActiveDistance_x: user8792009665.VeryActiveDistance_x, ModeratelyActiveDistance_x: user8792009665.ModeratelyActiveDistance_x, LightActiveDistance_x: user8792009665.LightActiveDistance_x, SedentaryActiveDistance_x: user8792009665.SedentaryActiveDistance_x, VeryActiveMinutes_x: user8792009665.VeryActiveMinutes_x, Calories_x: user8792009665.Calories_x, Calories_y: user8792009665.Calories_y, SedentaryMinutes_y: user8792009665.SedentaryMinutes_y, LightlyActiveMinutes_y: user8792009665.LightlyActiveMinutes_y, FairlyActiveMinutes_y: user8792009665.FairlyActiveMinutes_y, VeryActiveMinutes_y: user8792009665.VeryActiveMinutes_y, SedentaryActiveDistance_y: user8792009665.SedentaryActiveDistance_y, LightActiveDistance_y: user8792009665.LightActiveDistance_y, ModeratelyActiveDistance_y: user8792009665.ModeratelyActiveDistance_y, VeryActiveDistance_y: user8792009665.VeryActiveDistance_y, StepTotal: user8792009665.StepTotal, TotalSleepRecords: user8792009665.TotalSleepRecords, TotalMinutesAsleep: user8792009665.TotalMinutesAsleep, TotalTimeInBed: user8792009665.TotalTimeInBed  });
    }
}