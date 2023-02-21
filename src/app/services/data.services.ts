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
}