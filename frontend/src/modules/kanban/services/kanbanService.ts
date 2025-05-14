// src/modules/kanban/services/kanbanService.ts
// import { httpService } from '@core/services/api';
// import type { Task, TaskUpdate } from '../types/taskTypes';

import { httpService } from "../../../core/services";
import type { Task, TaskUpdate } from "../interfaces/task";

export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await httpService.get<Task[]>('/tasks');
  return data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const { data } = await httpService.post<Task>('/tasks', task);
  return data;
};

export const updateTask = async (id: string, updates: TaskUpdate): Promise<Task> => {
  const { data } = await httpService.patch<Task>(`/tasks/${id}`, updates);
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await httpService.delete(`/tasks/${id}`);
};