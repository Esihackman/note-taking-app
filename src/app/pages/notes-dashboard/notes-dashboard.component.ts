import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './notes-dashboard.component.html',
  styleUrls: ['./notes-dashboard.component.scss']
})
export class NotesDashboardComponent implements OnInit {
  allNotes: Note[] = [];
  filteredNotes: Note[] = [];
  searchTerm: string = '';
  selectedTag: string = '';
  authService: any;
  router: any;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.allNotes = this.noteService.getActive();
    this.filteredNotes = [...this.allNotes];
  }

  searchNotes(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredNotes = this.allNotes.filter(note =>
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term) ||
      note.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }

  filterByTag(tag: string): void {
    this.selectedTag = tag;
    this.filteredNotes = this.allNotes.filter(note =>
      note.tags.includes(tag)
    );
  }

  resetFilters(): void {
    this.selectedTag = '';
    this.searchTerm = '';
    this.filteredNotes = [...this.allNotes];
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  archiveNote(id: string): void {
    this.noteService.archive(id, true);
    this.ngOnInit(); // refresh the list
  }
}
