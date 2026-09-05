import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tasks-status-card',
  imports: [MatIconModule],
  templateUrl: './tasks-status-card.html',
  styles: ``,
})
export class TasksStatusCard {
  icon = input.required<string>();
  title = input.required<string>();
  value = input.required<number>();
  description = input.required<string>();
}
