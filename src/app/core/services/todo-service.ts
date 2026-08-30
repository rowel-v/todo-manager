import { Injectable, signal } from '@angular/core';
import { Todo, TodoStatus } from '../../shared/models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todosState = signal<Todo[]>([
    {
      id: 1,
      name: 'Buy groceries',
      description: 'Pick up milk, eggs, and whole wheat bread from the store.',
      priority: 'medium',
      status: 'pending',
      duedate: new Date('2026-09-02T18:00:00Z'),
      createdAt: new Date('2026-08-30T10:00:00Z'),
      updatedAt: new Date('2026-08-30T10:00:00Z'),
    },
    {
      id: 2,
      name: 'Fix login bug',
      description: 'Resolve the 401 unauthorized error on the OAuth redirect flow.',
      priority: 'high',
      status: 'in_progress',
      duedate: new Date('2026-08-31T12:00:00Z'),
      createdAt: new Date('2026-08-29T08:30:00Z'),
      updatedAt: new Date('2026-08-30T14:15:00Z'),
    },
    {
      id: 3,
      name: 'Schedule dentist appointment',
      priority: 'low',
      status: 'pending',
      duedate: new Date('2026-09-15T09:00:00Z'),
      createdAt: new Date('2026-08-30T19:00:00Z'),
      updatedAt: new Date('2026-08-30T19:00:00Z'),
    },
    {
      id: 4,
      name: 'Review pull requests',
      description: 'Check the team code submissions for the new dashboard features.',
      priority: 'high',
      status: 'completed',
      duedate: new Date('2026-08-30T17:00:00Z'),
      createdAt: new Date('2026-08-30T09:00:00Z'),
      updatedAt: new Date('2026-08-30T16:45:00Z'),
    },
  ]);
  todos = this.todosState.asReadonly();

  private defaultId = 0;

  addTodo(todo: Todo) {
    this.todosState.update((todos) => [
      ...todos,
      {
        ...todo,
        id: this.defaultId++,
      },
    ]);
  }

  updateStatus(todo: Todo, status: TodoStatus) {
    this.todosState.update((todos) => todos.map((t) => (t.id === todo.id ? { ...t, status } : t)));
  }

  deleteTodo(todo: Todo) {
    this.todosState.update((todos) => todos.filter((t) => t.id !== todo.id));
  }

  updateTodo(todo: Todo) {
    this.todosState.update((todos) =>
      todos.map((t) =>
        t.id === todo.id
          ? {
              ...t,
              name: todo.name,
              description: todo.description,
              priority: todo.priority,
              status: todo.status,
              duedate: todo.duedate,
              updatedAt: new Date(),
            }
          : t,
      ),
    );
  }
}
