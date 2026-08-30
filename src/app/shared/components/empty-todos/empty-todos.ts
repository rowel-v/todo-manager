import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-todos',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './empty-todos.html',
  styles: ``,
})
export class EmptyTodos {
  createTodo = output<void>();
}
