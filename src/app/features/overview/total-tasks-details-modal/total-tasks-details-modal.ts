import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../../../shared/models/todo';

@Component({
  selector: 'app-total-tasks-details-modal',
  imports: [MatIconModule],
  templateUrl: './total-tasks-details-modal.html',
  styles: ``,
})
export class TotalTasksDetailsModal {
  todos = input.required<Todo[]>();
  onClose = output<Event>();

  totalTasks(): number {
    return this.todos().length;
  }

  completedTasks() {
    return this.todos().filter((todo) => todo.status === 'completed');
  }

  pendingTasks() {
    return this.todos().filter((todo) => todo.status === 'pending');
  }

  overdueTodos() {
    return this.todos()
      .filter((todo) => todo.duedate.getTime() <= Date.now())
      .filter((todo) => todo.status !== 'completed');
  }

  upcomingTodos() {
    return this.todos().filter((todo) => todo.duedate.getTime() > Date.now());
  }
}
