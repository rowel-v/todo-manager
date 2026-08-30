import { Component, computed, inject, output, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatIconModule } from '@angular/material/icon';
import { Todo, TodoPriority, TodoStatus } from '../../../shared/models/todo';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// 1. Define the explicit Form Control interface for strict typing
interface TodoFormControls {
  name: FormControl<string>;
  description: FormControl<string | undefined>;
  priority: FormControl<TodoPriority>;
  status: FormControl<TodoStatus>;
  dueDate: FormControl<Date | null>;
  dueTime: FormControl<Date | null>;
}

@Component({
  selector: 'app-edit-todo-form',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatTimepickerModule,
  ],
  templateUrl: './edit-todo-form.html',
  styles: ``,
})
export class EditTodoForm {
  private readonly data = inject(MAT_DIALOG_DATA);
  todoToEdit: Todo = this.data;
  cancelled = output<void>();
  saved = output<Todo>();

  // 2. Fixed: Explicitly typed the Signal with <FormGroup<TodoFormControls>>
  private _todoForm: Signal<FormGroup<TodoFormControls>> = computed(() => {
    const todo = this.todoToEdit;
    const baseDate = todo.duedate ? new Date(todo.duedate) : null;

    return new FormGroup<TodoFormControls>({
      name: new FormControl(todo.name, {
        nonNullable: true,
        validators: [Validators.required],
      }),

      description: new FormControl(todo.description, {
        nonNullable: true,
      }),

      priority: new FormControl<TodoPriority>(todo.priority, {
        nonNullable: true,
      }),

      status: new FormControl<TodoStatus>(todo.status, {
        nonNullable: true,
      }),

      dueDate: new FormControl<Date | null>(baseDate, {
        validators: [Validators.required],
      }),
      dueTime: new FormControl<Date | null>(baseDate, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  });

  // 3. This getter matches the internal signal structure perfectly now
  public get todoForm(): FormGroup<TodoFormControls> {
    return this._todoForm();
  }

  submit() {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    const date = this.todoForm.controls.dueDate.value;
    const time = this.todoForm.controls.dueTime.value;

    if (!date || !time) {
      return;
    }

    const dueDate = new Date(date);
    dueDate.setHours(time.getHours(), time.getMinutes(), 0, 0);

    // 5. Clean, strictly typed mapping using clean dot notation
    const todo: Todo = {
      id: this.todoToEdit.id,
      name: this.todoForm.controls.name.value,
      description: this.todoForm.controls.description.value ?? '',
      priority: this.todoForm.controls.priority.value,
      status: this.todoForm.controls.status.value,
      duedate: dueDate,
      createdAt: this.todoToEdit.createdAt,
      updatedAt: new Date(),
    };

    this.saved.emit(todo);
  }
}
