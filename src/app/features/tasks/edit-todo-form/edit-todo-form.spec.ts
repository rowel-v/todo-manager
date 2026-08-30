import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTodoForm } from './edit-todo-form';

describe('EditTodoForm', () => {
  let component: EditTodoForm;
  let fixture: ComponentFixture<EditTodoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTodoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
