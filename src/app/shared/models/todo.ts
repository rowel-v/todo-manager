export type TodoPriority = 'low' | 'medium' | 'high';
export type TodoStatus = 'pending' | 'in_progress' | 'completed';

export interface Todo {
  id: number;
  name: string;
  description?: string;
  priority: TodoPriority;
  status: TodoStatus;
  duedate: Date;
  createdAt: Date;
  updatedAt: Date;
}
