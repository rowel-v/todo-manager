import { Component, input, signal } from '@angular/core';
import { Todo } from '../../models/todo';
import {
  LucideGhost,
  LucideCircleCheck,
  LucideClock5,
  LucideTriangleAlert,
  LucideCalendarClock,
  LucideFlagTriangleRight,
  LucideAlarmClock,
  LucideCircleEllipsis,
  LucideBadgeCheck,
  LucideCalendarCheck,
} from '@lucide/angular';

type LucidIconSelection =
  | 'completed'
  | 'pending'
  | 'overdue'
  | 'upcoming'
  | 'high_priority'
  | 'due_today'
  | 'in_progress'
  | 'completed_today'
  | 'completed_this_week';

@Component({
  selector: 'app-todo-details-list',
  imports: [
    LucideGhost,
    LucideCircleCheck,
    LucideClock5,
    LucideTriangleAlert,
    LucideCalendarClock,
    LucideFlagTriangleRight,
    LucideAlarmClock,
    LucideCircleEllipsis,
    LucideBadgeCheck,
    LucideCalendarCheck,
  ],
  templateUrl: './todo-details-list.html',
  styles: ``,
})
export class TodoDetailsList {
  todos = input.required<Todo[]>();
  icon = input.required<LucidIconSelection>();
  iconWhenEmpty = input.required<string>();
  titleWhenEmpty = input.required<string>();
  descriptionWhenEmpty = input.required<string>();
  isEnteringDetail = input.required<boolean>(); // for animation when navigate to specific todo
  selectedTodo = signal<Todo | null>(null);
}
