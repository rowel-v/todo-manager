import { Component, input, signal } from '@angular/core';
import { Todo } from '../../../../shared/models/todo';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo-details-list',
  imports: [MatIconModule],
  templateUrl: './todo-details-list.html',
  styles: ``,
})
export class TodoDetailsList {
  todos = input.required<Todo[]>();
  icon = input.required<string>();
  iconWhenEmpty = input.required<string>();
  titleWhenEmpty = input.required<string>();
  descriptionWhenEmpty = input.required<string>();
  isEnteringDetail = input.required<boolean>();

  selectedTodo = signal<Todo | null>(null);
}
