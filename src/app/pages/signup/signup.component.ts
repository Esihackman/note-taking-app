import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = false;

  constructor(private router: Router) {}

  signup(form: NgForm) {
    if (!form.valid || this.password !== this.confirmPassword) {
      this.error = this.password !== this.confirmPassword
        ? 'Passwords do not match.'
        : 'Please fill in all fields correctly.';
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];

    // Check if email is already registered
    const userExists = existingUsers.find(user => user.email === this.email);
    if (userExists) {
      this.error = 'Email is already registered.';
      return;
    }

    const newUser: User = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
    this.success = true;
    this.error = '';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
