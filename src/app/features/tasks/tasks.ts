import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../../core/services/todo-service';
import { Todo, TodoStatus } from '../../shared/models/todo';
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

  openCreateTodoFormDialog() {
    const dialogRef = this.todoFormDialog.open(CreateTodoForm, {
      width: '600px',
      height: '90vh',
    });

    dialogRef.componentInstance.submitted.subscribe((todo) => {
      this.addTodo(todo);
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
      this.updateTodo(todo);
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
      this.deleteTodo(todo);
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

    dialogRef.componentInstance.markAsCompleted.subscribe((todo) => {
      this.todoService.updateStatus(todo, 'completed');
      dialogRef.close();
    });

    dialogRef.componentInstance.closed.subscribe(() => {
      dialogRef.close();
    });
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  updateStatus(todo: Todo, status: TodoStatus) {
    this.todoService.updateStatus(todo, status);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }
}
