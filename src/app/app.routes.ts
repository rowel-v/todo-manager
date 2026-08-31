import { Routes } from '@angular/router';
import { Tasks } from './features/tasks/tasks';
import { Settings } from './features/settings/settings';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'tasks',
        component: Tasks,
      },
      {
        path: 'settings',
        component: Settings,
      },
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
    ],
  },
];
