import { Component, computed, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {
  LucideMenu,
  LucideHouse,
  LucideBadgeCheck,
  LucideSettings,
  LucideX,
} from '@lucide/angular';

type CurrentSidenav = 'home' | 'tasks' | 'settings';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    LucideMenu,
    LucideHouse,
    LucideBadgeCheck,
    LucideSettings,
    LucideX,
  ],
  templateUrl: './main-layout.html',
  styles: ``,
})
export class MainLayout {
  openSideNav = signal<boolean>(true);
  currentSideNav = signal<CurrentSidenav>('home');
  title = computed(() => {
    switch (this.currentSideNav()) {
      case 'home':
        return 'Good morning';
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
