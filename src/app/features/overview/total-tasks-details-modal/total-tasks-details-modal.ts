import { Component, input, output, signal } from '@angular/core';
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
  onClose = output<void>();

  protected isClosing = signal(false);

  protected closeTodosDetails(event: Event) {
    // VERY IMPORTANT:
    // Prevent the click from reaching the parent .stat
    event.stopPropagation();
    // Don't start the animation twice
    if (this.isClosing()) {
      return;
    }

    this.isClosing.set(true);
    // Wait for the CSS animation to finish
    setTimeout(() => {
      this.onClose.emit();
    }, 200);
  }

  protected totalTasks(): number {
    return this.todos().length;
  }

  protected completedTasks() {
    return this.todos().filter((todo) => todo.status === 'completed');
  }

  protected pendingTasks() {
    return this.todos().filter((todo) => todo.status === 'pending');
  }

  protected overdueTodos() {
    return this.todos()
      .filter((todo) => todo.duedate.getTime() <= Date.now())
      .filter((todo) => todo.status !== 'completed');
  }

  upcomingTodos() {
    return this.todos().filter((todo) => todo.duedate.getTime() > Date.now());
  }
}
