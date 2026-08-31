import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../../core/services/todo-service';
import { Todo } from '../../shared/models/todo';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { EmptyTodos } from '../../shared/components/empty-todos/empty-todos';
import { CreateTodoForm } from './create-todo-form/create-todo-form';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { formatDateTime } from '../../shared/utils/date-utils';
import { DeleteTodoDialog } from './delete-todo-dialog/delete-todo-dialog';
import { EditTodoForm } from './edit-todo-form/edit-todo-form';
import { TodoDetail } from './todo-detail/todo-detail';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

type FilterSelection = 'all' | 'pending' | 'in_progress' | 'completed';

@Component({
  selector: 'app-tasks',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatMenuModule,
    EmptyTodos,
    MatDialogModule,
    MatRippleModule,
    CommonModule,
  ],
  templateUrl: './tasks.html',
  styles: ``,
})
export class Tasks {
  private readonly todoService = inject(TodoService);
  private readonly todoFormDialog = inject(MatDialog);
  todos = this.todoService.todos;
  selectedTodo: Todo | null = null; // use for manage todo
  formatDateTime: (date: Date) => string = formatDateTime;
  currentFilterSelected = signal<FilterSelection>('all');

  changeCurrentFilterSelected(filter: FilterSelection) {
    this.currentFilterSelected.set(filter);
  }

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

  openEditTodoFormDialog() {
    const dialogRef = this.todoFormDialog.open(EditTodoForm, {
      width: '600px',
      height: '90vh',
      data: { ...this.selectedTodo },
    });

    dialogRef.componentInstance.saved.subscribe((todo) => {
      this.todoService.updateTodo(todo);
      dialogRef.close();
    });

    dialogRef.componentInstance.cancelled.subscribe(() => {
      dialogRef.close();
    });
  }

  openDeleteTodoDialog(todo: Todo) {
    const dialogRef = this.todoFormDialog.open(DeleteTodoDialog, {
      width: '400px',
    });

    dialogRef.componentInstance.confirmed.subscribe(() => {
      this.todoService.deleteTodo(todo);
      dialogRef.close();
    });

    dialogRef.componentInstance.cancelled.subscribe(() => {
      this.selectedTodo = null;
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
