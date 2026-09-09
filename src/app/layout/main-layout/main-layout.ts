import { Component, computed, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

type CurrentSidenav = 'home' | 'tasks' | 'settings';

@Component({
  selector: 'app-main-layout',
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    MatIconModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './main-layout.html',
  styles: ``,
})
export class MainLayout {
  openSideNav = signal<boolean>(false);
  currentSideNav = signal<CurrentSidenav>('home');

  title = computed(() => {
    switch (this.currentSideNav()) {
      case 'home':
        return 'Good morning!';
      case 'tasks':
        return 'Tasks';
      case 'settings':
        return 'Settings';
    }
  });
  description = computed(() => {
    switch (this.currentSideNav()) {
      case 'home':
        return "Here's your task overview for today.";
      case 'tasks':
        return 'Manage your todos and stay organized.';
      case 'settings':
        return 'Settings Description later.';
    }
  });
}
