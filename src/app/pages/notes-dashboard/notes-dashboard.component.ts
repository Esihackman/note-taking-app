import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './notes-dashboard.component.html',
  styleUrls: ['./notes-dashboard.component.scss']
})
export class NotesDashboardComponent implements OnInit {
  allNotes: Note[] = [];
  filteredNotes: Note[] = [];
  searchTerm: string = '';
  selectedTag: string | null = null;

  isDarkTheme: boolean = false;
  fontPreference: string = 'sans-serif';

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    // Load notes
    this.noteService.notes$.subscribe((notes: Note[]) => {
      this.allNotes = notes;
      this.filteredNotes = [...notes];
    });

    // Load and apply theme
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
    this.applyTheme(this.isDarkTheme);

    // Load and apply font preference
    const savedFont = localStorage.getItem('font');
    this.fontPreference = savedFont || 'sans-serif';
    this.applyFont(this.fontPreference);
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.applyTheme(this.isDarkTheme);
  }

  applyTheme(isDark: boolean): void {
    document.body.classList.toggle('dark-theme', isDark);
  }

  changeFont(event: Event): void {
    const selectedFont = (event.target as HTMLSelectElement).value;
    this.fontPreference = selectedFont;
    localStorage.setItem('font', selectedFont);
    this.applyFont(selectedFont);
  }

 applyFont(font: string): void {
  const fontMap: { [key: string]: string } = {
    'sans-serif': 'Segoe UI, sans-serif',
    'serif': 'Georgia, serif',
    'monospace': 'Courier New, monospace',
  };

  const selectedFont = fontMap[font] || 'Segoe UI, sans-serif';
  document.body.className = `font-${font}`;

  console.log('Font applied:', selectedFont);
}


sidebarVisible = false;

toggleSidebar(): void {
  this.sidebarVisible = !this.sidebarVisible;
}


  searchNotes(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredNotes = this.allNotes.filter(note => {
      const titleMatch = note.title.toLowerCase().includes(term);
      const contentMatch = note.content.toLowerCase().includes(term);
      const tagMatch = note.tags?.some(tag => tag.toLowerCase().includes(term));
      return titleMatch || contentMatch || tagMatch;
    });

    if (this.selectedTag) {
      this.filteredNotes = this.filteredNotes.filter(note =>
        note.tags.includes(this.selectedTag!)
      );
    }
  }

  filterByTag(tag: string): void {
    this.selectedTag = tag;
    this.filteredNotes = this.allNotes.filter(note =>
      note.tags.includes(tag)
    );
  }

  resetFilters(): void {
    this.selectedTag = null;
    this.searchTerm = '';
    this.filteredNotes = [...this.allNotes];
  }

  toggleArchive(note: Note): void {
    if (note.isArchived) {
      this.noteService.unarchiveNote(note.id);
    } else {
      this.noteService.archiveNote(note.id);
    }
  }

  trackById(index: number, note: Note): string {
    return note.id;
  }

  logout(): void {
    console.log('Logging out...');
  }
}
