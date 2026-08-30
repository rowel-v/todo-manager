import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTodos } from './empty-todos';

describe('EmptyTodos', () => {
  let component: EmptyTodos;
  let fixture: ComponentFixture<EmptyTodos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyTodos],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyTodos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
