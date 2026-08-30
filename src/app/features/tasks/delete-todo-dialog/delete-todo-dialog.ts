import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-todo-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './delete-todo-dialog.html',
  styles: ``,
})
export class DeleteTodoDialog {
  cancelled = output<void>();
  confirmed = output<void>();
}
