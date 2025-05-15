// src/modules/kanban/store/KanbanContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";
import type {
  Column,
  Task,
  TaskStatus,
} from "../interfaces/task";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
  updateTaskStatus,
} from "../services/kanbanService";
import { useModal } from "../../../shared/hooks/useModal";
// import { fetchTasks, updateTask } from '../services/kanbanService';

type KanbanContextType = {
  columns: Column[];
  isOpen: boolean;
  handleEditTask: (taskId: string, columnId: string) => void;
  handleSaveChanges: () => void;
  selectedTask: Task | null;
  editedTitle: string;
  editedDescription: string;
  onChangeEditTask: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  close: () => void;
  handleChangeStatus: (
    taskId: string,
    currentStatus: TaskStatus,
    direction: "left" | "right"
  ) => Promise<void>;
  handleDeleteTask: () => Promise<void>;
  handleCreateTask: () => Promise<void>;
  handleMoveTask: (
    taskId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => Promise<void>;
};

export const KanbanContext = createContext<KanbanContextType | null>(null);

export function KanbanProvider({ children }: { children: ReactNode }) {
  const [columns, setColumns] = useState<Column[]>([
    { id: "pending", title: "To Do", tasks: [] },
    { id: "in_progress", title: "In Progress", tasks: [] },
    { id: "testing", title: "Testing", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ]);

  const loadTasks = async () => {
    const tasks = await fetchTasks();
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: tasks.filter((task) => task.status === column.id),
      }))
    );
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const { isOpen, open, close } = useModal();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");

  const handleEditTask = (taskId: string, columnId: string) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column) {
      console.error(`Coluna com ID ${columnId} não encontrada.`);
      return;
    }

    const task = column.tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setEditedTitle(task.title);
      setEditedDescription(task.description || "");
      open(); // Abre o modal
    } else {
      console.error(
        `Tarefa com ID ${taskId} não encontrada na coluna ${columnId}.`
      );
    }
  };

  const onChangeEditTask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "task-title") {
      setEditedTitle(value);
    } else {
      setEditedDescription(value);
    }
  };

  const handleSaveChanges = async () => {
    if (selectedTask) {
      selectedTask.title = editedTitle;
      selectedTask.description = editedDescription;
      await updateTask(selectedTask.id, {
        title: editedTitle,
        description: editedDescription,
      });
      alert("Tarefa atualizada com sucesso!");
    } else {
      await createTask({
        title: editedTitle,
        description: editedDescription,
      });
      alert("Tarefa criada com sucesso!");
    }
    await loadTasks(); // Recarrega as tarefas após a atualização
    close();
  };

  const handleChangeStatus = async (
    taskId: string,
    currentStatus: TaskStatus,
    direction: "left" | "right"
  ) => {
    // Ordem dos status
    const statusOrder: TaskStatus[] = [
      "pending",
      "in_progress",
      "testing",
      "done",
    ];

    // Encontrar o índice do status atual
    const currentIndex = statusOrder.indexOf(currentStatus);

    // Determinar o novo índice com base na direção
    const newIndex =
      direction === "right"
        ? Math.min(currentIndex + 1, statusOrder.length - 1) // Não ultrapassar o último índice
        : Math.max(currentIndex - 1, 0); // Não ultrapassar o primeiro índice

    // Obter o novo status
    const newStatus = statusOrder[newIndex];

    // Atualizar a tarefa no estado
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        ),
      }))
    );
    await updateTaskStatus(taskId, { status: newStatus });
    await loadTasks();
  };

  const handleDeleteTask = async () => {
    if (selectedTask) {
      if (window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
        await deleteTask(selectedTask.id);
        await loadTasks();
        alert("Tarefa deletada com sucesso!");
      }
    }
    close();
  };

  const handleCreateTask = async () => {
    setSelectedTask(null);
    setEditedTitle("");
    setEditedDescription("");
    open();
  };

  const handleMoveTask = async (
    taskId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.id === sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          };
        }
        if (column.id === targetColumnId) {
          const taskToMove = prevColumns
            .find((col) => col.id === sourceColumnId)
            ?.tasks.find((task) => task.id === taskId);
          return {
            ...column,
            tasks: taskToMove ? [...column.tasks, { ...taskToMove, status: targetColumnId }] : column.tasks,
          };
        }
        return column;
      })
    );
    await updateTaskStatus(taskId, { status: targetColumnId as TaskStatus});
  };

  return (
    <KanbanContext.Provider
      value={{
        columns,
        isOpen,
        handleEditTask,
        handleSaveChanges,
        selectedTask,
        editedTitle,
        onChangeEditTask,
        editedDescription,
        close,
        handleChangeStatus,
        handleDeleteTask,
        handleCreateTask,
        handleMoveTask,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}
