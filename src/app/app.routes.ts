import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotesDashboardComponent } from './pages/notes-dashboard/notes-dashboard.component';

export const routes: Routes = [
 
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'notes', component: NotesDashboardComponent }

];
