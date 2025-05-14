// src/modules/kanban/store/KanbanContext.tsx
import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Column, TaskStatus } from '../interfaces/task';
import { fetchTasks, updateTask } from '../services/kanbanService';
// import { fetchTasks, updateTask } from '../services/kanbanService';

type KanbanContextType = {
  columns: Column[];
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
};

export const KanbanContext = createContext<KanbanContextType | null>(null);

export function KanbanProvider({ children }: { children: ReactNode }) {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'in_progress', title: 'in Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
  ]);

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks();
      console.log('Tarefas carregadas:', tasks);
      setColumns(prevColumns => 
        prevColumns.map(column => ({
          ...column,
          tasks: tasks.filter(task => task.status === column.id),
        }))
      );
    };
    loadTasks();
  }, []);

  const moveTask = async (taskId: string, newStatus: TaskStatus) => {
  try {
    // Atualização otimista (melhora a responsividade)
    setColumns(prevColumns => {
      const taskToMove = prevColumns
        .flatMap(col => col.tasks)
        .find(task => task.id === taskId);

      if (!taskToMove) return prevColumns;

      return prevColumns.map(column => ({
        ...column,
        tasks: column.id === newStatus
          ? [...column.tasks, { ...taskToMove, status: newStatus }]
          : column.tasks.filter(task => task.id !== taskId),
      }));
    });

    // Chamada real para a API
    await updateTask(taskId, { status: newStatus });
  } catch (error) {
    console.error('Falha ao mover tarefa:', error);
    // Reverte a atualização otimista em caso de erro
    setColumns(prevColumns => {
      const taskToRestore = prevColumns
        .flatMap(col => col.tasks)
        .find(task => task.id === taskId);

      if (!taskToRestore) return prevColumns;

      return prevColumns.map(column => ({
        ...column,
        tasks: column.id === taskToRestore.status
          ? [...column.tasks, taskToRestore]
          : column.tasks.filter(task => task.id !== taskId),
      }));
    });
  }
};

  return (
    <KanbanContext.Provider value={{ columns, moveTask }}>
      {children}
    </KanbanContext.Provider>
  );
}