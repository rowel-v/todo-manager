import { Component, computed, output, Signal, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatIconModule } from '@angular/material/icon';
import { Todo, TodoPriority, TodoStatus } from '../../../shared/models/todo';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-todo-form',
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
  templateUrl: './create-todo-form.html',
  styles: ``,
})
export class CreateTodoForm {
  cancelled = output<void>();
  submitted = output<Todo>();

  todoForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    description: new FormControl('', {
      nonNullable: true,
    }),

    priority: new FormControl<TodoPriority>('low', {
      nonNullable: true,
    }),

    status: new FormControl<TodoStatus>('pending', {
      nonNullable: true,
    }),

    dueDate: new FormControl<Date | null>(null, {
      validators: [Validators.required],
    }),
    dueTime: new FormControl<Date | null>(null, {
      validators: [Validators.required],
    }),
  });

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

    const todo: Todo = {
      id: 0,
      name: this.todoForm.controls.name.value,
      description: this.todoForm.controls.description.value,
      priority: this.todoForm.controls.priority.value,
      status: this.todoForm.controls.status.value,
      duedate: dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.submitted.emit(todo);
  }

  todayDate = new Date();

  dueDateSignal: Signal<Date | null> = toSignal(this.todoForm.controls.dueDate.valueChanges, {
    initialValue: this.todoForm.controls.dueDate.value,
  });

  minTime = computed(() => {
    const selectedDueDate = this.dueDateSignal()

    if (!selectedDueDate) {
      return null; // If no date is selected yet, DO NOT restrict the time.
    }

    // Check if the selected date is exactly today
    const selectedDueDateIsToday =
      selectedDueDate.getDate() === this.todayDate.getDate() &&
      selectedDueDate.getMonth() === this.todayDate.getMonth() &&
      selectedDueDate.getFullYear() === this.todayDate.getFullYear();

    if (selectedDueDateIsToday) {
      return new Date(); // // Restrict to current time and future times only
    }

    return null; // No time restrictions for future dates
  });

}
