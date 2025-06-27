import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent {
  title = '';
  content = '';
  tags = '';
  success = false;

  constructor(private noteService: NoteService, private router: Router) {}

  onSubmit(form: NgForm) {
  if (!form.valid) return;

  const tagArray = this.tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag);

  this.noteService.createNote({
    id: crypto.randomUUID(), // ✅ Ensure unique ID
    title: this.title,
    content: this.content,
    tags: tagArray,
    isArchived: false,
    createdAt: new Date()
  });

  this.success = true;

  setTimeout(() => {
    this.router.navigate(['/notes']);
  }, 1000);
}
cancel() {
  this.router.navigate(['/notes']);
}

}