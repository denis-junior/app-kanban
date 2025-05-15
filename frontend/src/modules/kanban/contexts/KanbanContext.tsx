// src/modules/kanban/store/KanbanContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";
import type {
  Column,
  Task,
  // TaskStatus
} from "../interfaces/task";
import { fetchTasks, updateTask } from "../services/kanbanService";
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
    console.log("Tarefas carregadas:", tasks);
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
      console.log("Salvando alterações para a tarefa:", selectedTask);
      // Atualiza os dados da tarefa (aqui você pode integrar com uma API ou estado global)
      selectedTask.title = editedTitle;
      selectedTask.description = editedDescription;
      await updateTask(selectedTask.id, {
        title: editedTitle,
        description: editedDescription,
      });
      await loadTasks(); // Recarrega as tarefas após a atualização
      alert("Tarefa atualizada com sucesso!");
    }
    close();
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
        close
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}
