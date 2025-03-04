import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Frontend';
  isScrolled = false;

  // Detect scroll events
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    console.log('Scroll Y:', window.scrollY); // Log the scroll position for debugging
    this.isScrolled = window.scrollY > 200; // The button should appear after scrolling 200px
    console.log('isScrolled:', this.isScrolled); // Log the state of isScrolled
  }

  // Scroll to top function
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
