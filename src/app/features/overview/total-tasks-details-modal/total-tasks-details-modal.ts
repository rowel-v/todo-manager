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
  closed = output<void>();
  protected isClosing = signal(false);

  protected closeModal() {
    if (this.isClosing()) {
      return;
    }

    this.isClosing.set(true);
    // Wait for the CSS animation to finish
    setTimeout(() => {
      this.closed.emit();
    }, 200);
  }

  protected totalTodosCount(): number {
    return this.todos().length;
  }

  protected completedTodos() {
    return this.todos().filter((todo) => todo.status === 'completed');
  }

  protected pendingTodos() {
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
