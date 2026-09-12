import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  LucideClipboardList,
  LucideClock5,
  LucideCircleEllipsis,
  LucideCircleCheck,
} from '@lucide/angular';

type StatusCardIcon= 'total' | 'pending' | 'in_progress' | 'completed';

@Component({
  selector: 'app-tasks-status-card',
  imports: [
    MatIconModule,
    LucideClipboardList,
    LucideClock5,
    LucideCircleEllipsis,
    LucideCircleCheck,
  ],
  templateUrl: './tasks-status-card.html',
  styles: ``,
})
export class TasksStatusCard {
  icon = input.required<StatusCardIcon>();
  title = input.required<string>();
  value = input.required<number>();
  description = input.required<string>();
}
