import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private notes = new BehaviorSubject<Note[]>([]);
  notes$ = this.notes.asObservable();

  constructor() {}

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  create(note: Partial<Note>) {
    const newNote: Note = {
      id: this.generateId(),
      title: note.title || '',
      content: note.content || '',
      tags: note.tags || [],
      isAchieved: false,
      createdAt: new Date(),
    };
    this.notes.next([...this.notes.value, newNote]);
  }

  update(id: string, changes: Partial<Note>) {
    const updated = this.notes.value.map(note =>
      note.id === id ? { ...note, ...changes } : note
    );
    this.notes.next(updated);
  }

  delete(id: string) {
    const filtered = this.notes.value.filter(note => note.id !== id);
    this.notes.next(filtered);
  }

  archive(id: string, isAchieved: boolean) {
    this.update(id, { isAchieved });
  }

  getNoteById(id: string): Note | undefined {
    return this.notes.value.find(note => note.id === id);
  }

  search(query: string): Note[] {
    const q = query.toLowerCase();
    return this.notes.value.filter(
      note =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q) ||
        note.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  getArchived(): Note[] {
    return this.notes.value.filter(note => note.isAchieved);
  }

  getActive(): Note[] {
    return this.notes.value.filter(note => !note.isAchieved);
  }
}
