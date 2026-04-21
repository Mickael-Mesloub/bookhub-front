import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  links = [
    { label: 'Catalogue', path: '/', exact: true },
  ];

  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
