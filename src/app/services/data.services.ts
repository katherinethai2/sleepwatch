import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface Note {
    id?: string;
    date: string;
    heart_rate_awake: string;
    heart_rate_sleep: string;
    calories_burned: string;
    step_count: string;
}

export interface User {
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
    SedentaryMinutes_y: string;
    LightlyActiveMinutes_y: string;
    FairlyActiveMinutes_y: string;
    VeryActiveMinutes_y: string;
    SedentaryActiveDistance_y: string;
    LightActiveDistance_y: string;
    ModeratelyActiveDistance_y: string;
    VeryActiveDistance_y: string;
    StepTotal: string;
    SleepEffecent: string;
}

export interface Daily {
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
    SedentaryMinutes_y: string;
    LightlyActiveMinutes_y: string;
    FairlyActiveMinutes_y: string;
    VeryActiveMinutes_y: string;
    SedentaryActiveDistance_y: string;
    LightActiveDistance_y: string;
    ModeratelyActiveDistance_y: string;
    VeryActiveDistance_y: string;
    StepTotal: string;
    SleepEffecent: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private firestore: Firestore) {}

    getNotes(): Observable<Note[]>{ 
        const notesRef = collection(this.firestore, 'notes');
        return collectionData(notesRef, { idField: 'id'}) as Observable<Note[]>; 
    }

    getNoteById(id: Note): Observable<Note> {
        const noteDocRef = doc(this.firestore, 'notes/${id}');
        return docData(noteDocRef, { idField: 'id' }) as Observable<Note>;
    }

    addNote(note:Note) {
        const notesRef = collection(this.firestore, 'notes');
        return addDoc(notesRef, note);
    }

    deleteNote(note: Note) {
        const noteDocRef = doc(this.firestore, 'notes/${note.id');
        return deleteDoc(noteDocRef);
    }

    updateNote(note: Note) {
        const noteDocRef = doc(this.firestore, 'notes/${note.id}');
        return updateDoc(noteDocRef, { date: note.date, heart_rate_awake: note.heart_rate_awake, heart_rate_sleep: note.heart_rate_sleep, calories_burned: note.calories_burned, step_count: note.step_count });
    }

    getUser(): Observable<User[]>{ 
        const userRef = collection(this.firestore, 'user');
        return collectionData(userRef, { idField: 'id'}) as Observable<User[]>; 
    }

    getUserById(id: User): Observable<User> {
        const userDocRef = doc(this.firestore, 'user/${id}');
        return docData(userDocRef, { idField: 'id' }) as Observable<User>;
    }

    addUser(user:User) {
        const userRef = collection(this.firestore, 'user');
        return addDoc(userRef, user);
    }

    deleteUser(user: User) {
        const userDocRef = doc(this.firestore, 'user/${user.id');
        return deleteDoc(userDocRef);
    }

    updateUser(user: User) {
        const userDocRef = doc(this.firestore, 'user/${user.id}');
        return updateDoc(userDocRef, { date: user.date, TotalSteps: user.TotalSteps, TotalDistance: user.TotalDistance, TrackerDistance: user.TrackerDistance, LoggedActivitiesDistance: user.LoggedActivitiesDistance, VeryActiveDistance_x: user.VeryActiveDistance_x, ModeratelyActiveDistance_x: user.ModeratelyActiveDistance_x, LightActiveDistance_x: user.LightActiveDistance_x, SedentaryActiveDistance_x: user.SedentaryActiveDistance_x, VeryActiveMinutes_x: user.VeryActiveMinutes_x, SedentaryMinutes_y: user.SedentaryMinutes_y, LightlyActiveMinutes_y: user.LightlyActiveMinutes_y, FairlyActiveMinutes_y: user.FairlyActiveMinutes_y, VeryActiveMinutes_y: user.VeryActiveMinutes_y, SedentaryActiveDistance_y: user.SedentaryActiveDistance_y, LightActiveDistance_y: user.LightActiveDistance_y, ModeratelyActiveDistance_y: user.ModeratelyActiveDistance_y, VeryActiveDistance_y: user.VeryActiveDistance_y, StepTotal: user.StepTotal, SleepEffecent: user.SleepEffecent  });
    }

    getDaily(): Observable<Daily[]>{ 
        const dailyRef = collection(this.firestore, 'daily');
        return collectionData(dailyRef, { idField: 'id'}) as Observable<Daily[]>; 
    }

    getDailyById(id: Daily): Observable<Daily> {
        const dailyDocRef = doc(this.firestore, 'daily/${id}');
        return docData(dailyDocRef, { idField: 'id' }) as Observable<Daily>;
    }

    addDaily(daily:Daily) {
        const dailyRef = collection(this.firestore, 'daily');
        return addDoc(dailyRef, daily);
    }

    deleteDaily(daily: Daily) {
        const dailyDocRef = doc(this.firestore, 'daily/${daily.id');
        return deleteDoc(dailyDocRef);
    }

    updateDaily(daily: Daily) {
        const dailyDocRef = doc(this.firestore, 'daily/${daily.id}');
        return updateDoc(dailyDocRef, { date: daily.date, TotalSteps: daily.TotalSteps, TotalDistance: daily.TotalDistance, TrackerDistance: daily.TrackerDistance, LoggedActivitiesDistance: daily.LoggedActivitiesDistance, VeryActiveDistance_x: daily.VeryActiveDistance_x, ModeratelyActiveDistance_x: daily.ModeratelyActiveDistance_x, LightActiveDistance_x: daily.LightActiveDistance_x, SedentaryActiveDistance_x: daily.SedentaryActiveDistance_x, VeryActiveMinutes_x: daily.VeryActiveMinutes_x, SedentaryMinutes_y: daily.SedentaryMinutes_y, LightlyActiveMinutes_y: daily.LightlyActiveMinutes_y, FairlyActiveMinutes_y: daily.FairlyActiveMinutes_y, VeryActiveMinutes_y: daily.VeryActiveMinutes_y, SedentaryActiveDistance_y: daily.SedentaryActiveDistance_y, LightActiveDistance_y: daily.LightActiveDistance_y, ModeratelyActiveDistance_y: daily.ModeratelyActiveDistance_y, VeryActiveDistance_y: daily.VeryActiveDistance_y, StepTotal: daily.StepTotal, SleepEffecent: daily.SleepEffecent  });
    }
}