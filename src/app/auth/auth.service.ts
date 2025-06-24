import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const matchedUser = users.find(
      (user: any) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem(this.TOKEN_KEY, 'mock-token-12345');
      localStorage.setItem('currentUser', JSON.stringify(matchedUser)); // Optional: Save user
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
}
