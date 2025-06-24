import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  // goToSignup() {
  //   this.router.navigate(['/signup']);
  // }
}
