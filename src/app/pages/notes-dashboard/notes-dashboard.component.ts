import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './notes-dashboard.component.html',
  styleUrls: ['./notes-dashboard.component.scss']
})
export class NotesDashboardComponent implements OnInit {
  allNotes: Note[] = [];
  filteredNotes: Note[] = [];
  searchTerm: string = '';
  selectedTag: string = '';

  constructor(
    private noteService: NoteService,
    private router: Router // ✅ Needed for logout redirect
  ) {}

  ngOnInit(): void {
    this.noteService.notes$.subscribe(notes => {
      this.allNotes = notes;
      this.filteredNotes = this.filterNotes(notes);
    });
  }

  searchNotes(): void {
    this.filteredNotes = this.filterNotes(this.allNotes);
  }

  filterByTag(tag: string): void {
    this.selectedTag = tag;
    this.filteredNotes = this.allNotes.filter(note => note.tags.includes(tag));
  }

  resetFilters(): void {
    this.selectedTag = '';
    this.filteredNotes = this.allNotes;
  }

  archiveNote(id: string): void {
    this.noteService.archive(id, true);
  }

  deleteNote(id: string): void {
    if (confirm('Are you sure you want to delete this note?')) {
      this.noteService.delete(id);
    }
  }

  logout(): void {
    localStorage.removeItem('user'); // Change this key if using a different token
    this.router.navigate(['/login']);
  }

  private filterNotes(notes: Note[]): Note[] {
    const q = this.searchTerm.toLowerCase();
    return notes.filter(note =>
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q) ||
      note.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }
}
