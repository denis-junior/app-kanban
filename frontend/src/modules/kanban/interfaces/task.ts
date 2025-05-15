export type TaskStatus = 'pending' | 'in_progress' | "testing" | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status?: TaskStatus;
}

export interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

export type TaskUpdate = Partial<Omit<Task, 'id'>>;