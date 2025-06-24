import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  success: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(form: NgForm): void {
    if (!form.valid) return;

    const success = this.authService.login(this.email, this.password);
    if (success) {
      this.success = true;
      this.error = '';
      setTimeout(() => {
        this.router.navigate(['/notes']);
      }, 1000);
    } else {
      this.success = false;
      this.error = 'Invalid email or password.';
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
