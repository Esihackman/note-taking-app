import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesSubject = new BehaviorSubject<Note[]>([]);
  notes$ = this.notesSubject.asObservable();

  constructor() {
    
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    this.notesSubject.next(savedNotes);
  }

  getNotes(): Note[] {
    return this.notesSubject.getValue();
  }

  getArchivedNotes(): Note[] {
    return this.notesSubject.getValue().filter((note: Note) => note.isArchived);
  }

  createNote(note: Note): void {
  const currentNotes = this.notesSubject.getValue();
  const updatedNotes = [...currentNotes, note];
  this.notesSubject.next(updatedNotes);
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
}


 archiveNote(id: string): void {
  const notes = this.notesSubject.getValue();
  console.log('Archiving Note ID:', id);
  notes.forEach(note => console.log('note.id =', note.id));

  const updatedNotes = notes.map((note: Note) =>
    note.id === id ? { ...note, isArchived: true } : note
  );
  this.notesSubject.next(updatedNotes);
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
}





  unarchiveNote(id: string): void {
  const updatedNotes = this.notesSubject.getValue().map((note: Note) =>
    note.id === id ? { ...note, isArchived: false } : note
  );
  this.notesSubject.next(updatedNotes);
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
}


  deleteNote(id: string): void {
    const updatedNotes = this.notesSubject.getValue().filter((note: Note) => note.id !== id);
    this.notesSubject.next(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }

  updateNote(updatedNote: Note): void {
    const updatedNotes = this.notesSubject.getValue().map((note: Note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    this.notesSubject.next(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }
  getNoteById(id: string): Note | undefined {
  return this.notesSubject.getValue().find((note: Note) => note.id === id);
}

}
