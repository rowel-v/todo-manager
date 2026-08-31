import { Component, computed, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Todo, TodoStatus } from '../../../shared/models/todo';
import { formatDateTime } from '../../../shared/utils/date-utils';

@Component({
  selector: 'app-todo-detail',
  // Import the necessary Material and Common modules here
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './todo-detail.html',
  styles: ``,
})
export class TodoDetail {
  private readonly data: Todo = inject(MAT_DIALOG_DATA);
  readonly todo: Todo = this.data;
  readonly formattedDueDate = computed(() => {
    return formatDateTime(this.data.duedate);
  });

  closed = output<void>();
  updatedStatus = output<{ todoToUpdate: Todo; updatedStatus: TodoStatus }>();
}
