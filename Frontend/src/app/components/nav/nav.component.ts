import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class NavComponent {
  mobileMenuOpen = false;

  toggleMobileMenu() {
    console.log('clicked');

    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  navigateToSection(sectionId: string) {
    // Close the mobile menu
    this.mobileMenuOpen = false;

    // Scroll to the section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
