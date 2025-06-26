import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { Router } from '@angular/router'; // ✅ Import Router

@Component({
  selector: 'app-archived-notes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archived-notes.component.html',
  styleUrls: ['./archived-notes.component.scss']
})
export class ArchivedNotesComponent implements OnInit {
  archivedNotes: Note[] = [];

  constructor(
    private noteService: NoteService,
    private router: Router // ✅ Inject it here
  ) {}

  ngOnInit(): void {
    this.noteService.notes$.subscribe((notes: Note[]) => {
      this.archivedNotes = notes.filter(note => note.isArchived);
      console.log('All notes:', notes);
      console.log('Archived:', this.archivedNotes);
    });
  }

  unarchiveNote(id: string): void {
    this.noteService.unarchiveNote(id);
  }

  toggleArchive(note: Note): void {
    if (note.isArchived) {
      this.noteService.unarchiveNote(note.id);
    } else {
      this.noteService.archiveNote(note.id);
    }
  }

  goBack(): void {
    this.router.navigate(['/notes']); // ✅ Now works correctly
  }
}
