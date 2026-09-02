import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

type CurrentSidenav = 'home' | 'tasks' | 'settings'

@Component({
  selector: 'app-main-layout',
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    MatIconModule,
    RouterLink,
    MatToolbarModule,
  ],
  templateUrl: './main-layout.html',
  styles: ``,
})
export class MainLayout {

  currentSideNav: CurrentSidenav = 'home'

}
