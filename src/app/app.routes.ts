import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotesDashboardComponent } from './pages/notes-dashboard/notes-dashboard.component';
import { CreateNoteComponent } from './pages/create-note/create-note.component';
import { NoteDetailComponent } from './pages/note-detail/note-detail.component';
import { EditNoteComponent } from './pages/edit-note/edit-note.component';

export const routes: Routes = [
 
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'notes', component: NotesDashboardComponent },
  {path: 'create-note', component: CreateNoteComponent},
  { path: 'notes/:id', component: NoteDetailComponent },
  { path: 'notes/:id/edit', component: EditNoteComponent },

];
