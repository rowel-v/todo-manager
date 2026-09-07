import { Component, computed, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../../../shared/models/todo';
import { TodoDetailsList } from '../../../shared/components/todo-details-list/todo-details-list';
type TaskCategory = 'completed' | 'pending' | 'overdue' | 'upcoming' | null;

@Component({
  selector: 'app-total-tasks-details-modal',
  templateUrl: './total-tasks-details-modal.html',
  imports: [MatIconModule, TodoDetailsList],
  styles: ``,
})
export class TotalTasksDetailsModal {
  todos = input.required<Todo[]>(); // Input todos from the parent component.
  protected completedTodos = computed(() => this.todos().filter((t) => t.status === 'completed'));
  // Gets pending and in-progress todos.
  protected pendingTodos = computed(() =>
    this.todos().filter((t) => t.status === 'pending' || t.status === 'in_progress'),
  );
  // Gets overdue todos that are not completed.
  protected overdueTodos = computed(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    return this.todos()
      .filter((t) => t.status !== 'completed')
      .filter((t) => new Date(t.duedate) < startOfDay);
  });
  // Gets upcoming todos that are not completed.
  protected upcomingTodos = computed(() =>
    this.todos()
      .filter((t) => t.status !== 'completed')
      .filter((t) => t.duedate > new Date()),
  );
  closed = output<void>(); // used to notify the parent when the modal is closed.
  protected isClosing = signal(false); // Controls the modal closing animation.
  protected isReturning = signal(false); // for animation when returning to the task breakdown.
  protected selectedCategory = signal<TaskCategory>(null); // Stores the currently selected task category.
  // Updates the selected category and determines the navigation animation.
  protected selectCategory(taskCategory: TaskCategory) {
    // Animate from left when returning to the task breakdown.
    this.isReturning.set(this.selectedCategory() !== null && taskCategory === null);
    this.selectedCategory.set(taskCategory);
  }

  // Starts the modal closing animation before notifying the parent.
  protected closeModal() {
    if (this.isClosing()) return;

    this.isClosing.set(true);

    setTimeout(() => {
      this.closed.emit();
      this.isClosing.set(false);
    }, 200);
  }
}
