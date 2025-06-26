import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-note',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent {
  note: Note | undefined;
  successMessage: string = '';
 tagsInput: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.note = this.noteService.getNoteById(id);
    }
  }

  updateNote() {
    if (this.note) {
      this.noteService.updateNote( this.note);
      this.successMessage = 'Note updated successfully!';
      // Optional: Clear message after a few seconds
      setTimeout(() => {
      this.router.navigate(['/notes']);
    }, 1000); 
  }
}

  updateTags(event: Event) {
    const input = event.target as HTMLInputElement;
    if (this.note) {
      this.note.tags = input.value.split(',').map(tag => tag.trim());
    }
  }
}
