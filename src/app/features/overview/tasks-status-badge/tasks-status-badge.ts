import { Component, input } from '@angular/core';
import { LucideClock5, LucideCircleEllipsis, LucideCircleCheck } from '@lucide/angular';
type Status = 'Completed' | 'Pending' | 'In Progress';

@Component({
  selector: 'app-tasks-status-badge',
  imports: [LucideClock5, LucideCircleEllipsis, LucideCircleCheck],
  templateUrl: './tasks-status-badge.html',
  styles: ``,
})
export class TasksStatusBadge {
  status = input.required<Status>();
}
