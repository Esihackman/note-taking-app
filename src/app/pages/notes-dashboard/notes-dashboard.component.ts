import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './notes-dashboard.component.html',
  styleUrls: ['./notes-dashboard.component.scss']
})
export class NotesDashboardComponent implements OnInit, OnDestroy {
  allNotes: Note[] = [];
  filteredNotes: Note[] = [];
  searchTerm: string = '';
  selectedTag: string | null = null;

  isDarkTheme: boolean = false;
  fontPreference: string = 'sans-serif';

  isMobile: boolean = false;
  showDropdownMenu: boolean = false;

  private resizeListener = () => this.checkDevice();

  constructor(
    private noteService: NoteService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkDevice();
    window.addEventListener('resize', this.resizeListener);

    this.noteService.notes$.subscribe((notes: Note[]) => {
      this.allNotes = notes;
      this.filteredNotes = [...notes];
    });

    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
    this.applyTheme(this.isDarkTheme);

    const savedFont = localStorage.getItem('font');
    this.fontPreference = savedFont || 'sans-serif';
    this.applyFont(this.fontPreference);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  checkDevice(): void {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.showDropdownMenu = false; // hide dropdown if moving to desktop
    }
  }

  toggleDropdown(): void {
    this.showDropdownMenu = !this.showDropdownMenu;
  }

  closeDropdown(): void {
    this.showDropdownMenu = false;
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
    document.body.classList.remove('font-sans-serif', 'font-serif', 'font-monospace');
    document.body.classList.add(`font-${font}`);
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
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
