import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TodoService } from '../../core/services/todo-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoForm } from '../tasks/create-todo-form/create-todo-form';
import { RouterLink } from '@angular/router';
import { Todo } from '../../shared/models/todo';
import { A11yModule } from '@angular/cdk/a11y';
import { TodoDetail } from '../tasks/todo-detail/todo-detail';
import { formatDateTime } from '../../shared/utils/date-utils';

@Component({
  selector: 'app-overview',
  imports: [MatIconModule, RouterLink, A11yModule],
  templateUrl: './overview.html',
  styles: ``,
})
export class Overview {
  readonly todoService = inject(TodoService);
  selectedTodo: Todo | null = null;
  readonly formatDateTime = formatDateTime;
  private readonly todoFormDialog = inject(MatDialog);

  openCreateTodoFormDialog() {
    const dialogRef = this.todoFormDialog.open(CreateTodoForm, {
      width: '600px',
      height: '90vh',
    });

    dialogRef.componentInstance.submitted.subscribe((todo) => {
      this.todoService.addTodo(todo);
      dialogRef.close();
    });

    dialogRef.componentInstance.cancelled.subscribe(() => {
      dialogRef.close();
    });
  }

  openTodoDetail() {
    const dialogRef = this.todoFormDialog.open(TodoDetail, {
      width: '500px',
      data: this.selectedTodo,
    });

    dialogRef.componentInstance.updatedStatus.subscribe(({ todoToUpdate, updatedStatus }) => {
      this.todoService.updateStatus(todoToUpdate, updatedStatus);
      dialogRef.close();
    });

    dialogRef.componentInstance.closed.subscribe(() => {
      dialogRef.close();
    });
  }
}
