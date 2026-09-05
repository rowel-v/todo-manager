import { Component, computed, input, output, signal } from '@angular/core';
import { Todo } from '../../../shared/models/todo';
import { MatIconModule } from '@angular/material/icon';

type Selection = 'pending' | 'high_priority' | 'due_today' | 'overdue' | null;

@Component({
  selector: 'app-pending-tasks-details-modal',
  imports: [MatIconModule],
  templateUrl: './pending-tasks-details-modal.html',
  styles: ``,
})
export class PendingTasksDetailsModal {
  // Input todos from the parent component.
  todos = input.required<Todo[]>();

  // Output event used to notify the parent when the modal is closed.
  closed = output<void>();

  // Controls the modal closing animation.
  isClosing = signal(false);

  // Controls the animation when navigating into a detail section.
  protected isEnteringDetail = signal(false);

  // Controls the animation when returning to the task breakdown.
  protected isReturning = signal(false);

  // Stores the currently selected task category.
  protected currentSelected = signal<Selection>(null);

  // Gets all pending todos.
  protected pendingTodos = computed(() => this.todos().filter((t) => t.status === 'pending'));

  // Gets pending todos with high priority.
  protected pendingHighPriority = computed(() =>
    this.pendingTodos().filter((t) => t.priority === 'high'),
  );

  // Gets pending todos that are due today.
  protected pendingDueToday = computed(() => {
    const today = new Date().toDateString();

    return this.pendingTodos().filter((t) => {
      return new Date(t.duedate).toDateString() === today;
    });
  });

  // Gets overdue todos that are not completed.
  protected overdueTodos = computed(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    return this.todos()
      .filter((t) => t.status != 'completed')
      .filter((t) => new Date(t.duedate) < startOfDay);
  });

  // Updates the selected category and determines the navigation animation.
  setCurrentSelected(select: Selection) {
    const previous = this.currentSelected();

    // Animate from right when entering a detail section.
    this.isEnteringDetail.set(previous === null && select !== null);

    // Animate from left when returning to the task breakdown.
    this.isReturning.set(previous !== null && select === null);

    this.currentSelected.set(select);
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
