import { Component, computed, input, output, signal } from '@angular/core';
import { Todo } from '../../../shared/models/todo';
import { MatIconModule } from '@angular/material/icon';
import { TodoDetailsList } from '../../../shared/components/todo-details-list/todo-details-list';

type TaskCategory = 'in_progress' | 'high_priority' | 'due_today' | 'overdue' | null;

@Component({
  selector: 'app-inprogress-tasks-details-modal',
  imports: [MatIconModule, TodoDetailsList],
  templateUrl: './inprogress-tasks-details-modal.html',
  styles: ``,
})
export class InprogressTasksDetailsModal {
  todos = input.required<Todo[]>(); // Input todos from the parent component.
  protected inProgressTodos = computed(() =>
    this.todos().filter((t) => t.status === 'in_progress'),
  );
  // Gets in-progress todos with high priority.
  protected inProgressHighPriority = computed(() =>
    this.inProgressTodos().filter((t) => t.priority === 'high'),
  );
  // Gets in-progress todos that are due today.
  protected inProgressDueToday = computed(() => {
    const today = new Date().toDateString();
    return this.inProgressTodos().filter((t) => {
      return new Date(t.duedate).toDateString() === today;
    });
  });
  // Gets in-progress todos that are not completed.
  protected overdueTodos = computed(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    return this.todos()
      .filter((t) => t.status !== 'completed')
      .filter((t) => new Date(t.duedate) < startOfDay);
  });
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
