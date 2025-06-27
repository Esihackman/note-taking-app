import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
  note: Note | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.note = this.noteService.getNoteById(id);
    }
  }

  deleteNote() {
    if (this.note && confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(this.note.id);
      this.router.navigate(['/notes']);
    }
  }

  goBack() {
    this.router.navigate(['/notes']);
  }
  showDeleteModal = false;

openDeleteModal(): void {
  this.showDeleteModal = true;
}

cancelDelete(): void {
  this.showDeleteModal = false;
}

confirmDelete(): void {
  if (this.note?.id) {
    this.noteService.deleteNote(this.note.id);
    this.router.navigate(['/notes']);
  }
}


}
