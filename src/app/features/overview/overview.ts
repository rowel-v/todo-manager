import { Component, inject, Signal, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TodoService } from '../../core/services/todo-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoForm } from '../tasks/create-todo-form/create-todo-form';
import { RouterLink } from '@angular/router';
import { Todo } from '../../shared/models/todo';
import { A11yModule } from '@angular/cdk/a11y';
import { TodoDetail } from '../tasks/todo-detail/todo-detail';
import { formatDateTime } from '../../shared/utils/date-utils';
import { TotalTasksDetailsModal } from './total-tasks-details-modal/total-tasks-details-modal';
import { TasksStatusCard } from "./tasks-status-card/tasks-status-card";

type TodosDetailsFlag = 'total' | 'pending' | 'in_progress' | 'completed' | null;

@Component({
  selector: 'app-overview',
  imports: [MatIconModule, RouterLink, A11yModule, TotalTasksDetailsModal, TasksStatusCard],
  templateUrl: './overview.html',
  styles: ``,
})
export class Overview {
  private readonly todoService = inject(TodoService);
  protected readonly todos: Signal<Todo[]> = this.todoService.todos;
  protected selectedTodo = signal<Todo | null>(null);
  protected readonly formatDateTime: (d:Date) => string = formatDateTime;
  private readonly todoFormDialog = inject(MatDialog);
  protected modalTodosDetails: TodosDetailsFlag = null;
  protected todosDetailsFlag = signal<TodosDetailsFlag>(null);
  protected isClosing = signal(false);
  protected openModalTodosDetailsFlag(currentTodosDetailsSelected: TodosDetailsFlag) {
    this.todosDetailsFlag.set(currentTodosDetailsSelected);
  }

  protected closeTodosDetails(event: Event) {
    event.stopPropagation();

    this.isClosing.set(true);

    setTimeout(() => {
      this.todosDetailsFlag.set(null);
      this.isClosing.set(false);
    }, 200);
  }
  protected openCreateTodoFormDialog() {
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

  protected openTodoDetail() {
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

  protected totalTasks(): number {
    return this.todoService.totalTasks();
  }

  protected totalPendingTasks(): number {
    return this.todoService.totalPendingTasks();
  }

  protected totalInProgressTasks(): number {
    return this.todoService.totalInProgressTasks();
  }

  protected totalCompletedTasks(): number {
    return this.todoService.totalCompletedTasks();
  }

  protected completionRate(): number {
    return this.todoService.completionRate();
  }

  protected todaysTasks(): Todo[] {
    return this.todoService.todaysTasks();
  }
  protected upcomingTodos(): Todo[] {
    return this.todoService.upcomingTodos();
  }
}
