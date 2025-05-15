import type { Column } from "../interfaces/task";
import { KanbanModal } from "./KanbanModal";
import { KanbanTask } from "./KanbanTask";
import { useKanban } from "../hooks/useKanban";

export function KanbanColumn({ column }: { column: Column }) {
  const {
    handleEditTask,
    isOpen,
    onChangeEditTask,
    editedTitle,
    editedDescription,
    handleSaveChanges,
    handleChangeStatus,
    handleDeleteTask,
    close,
    selectedTask
  } = useKanban();

  return (
    <div
      style={{
        flex: 1,
        padding: "1rem",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
      }}
    >
      <h2>{column.title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {column.tasks.map((task) => (
          <KanbanTask
            key={task.id}
            task={task}
            columnId={column.id}
            handleEditTask={handleEditTask}
            changeStatus={handleChangeStatus}
          />
        ))}
      </div>

      <KanbanModal
        show={isOpen}
        onHide={close}
        title={selectedTask ? "Editar Tarefa" : "Criar Nova Tarefa"}
        editedTitle={editedTitle}
        editedDescription={editedDescription}
        onChangeEditTask={onChangeEditTask}
        onConfirm={handleSaveChanges}
        onDelete={selectedTask ? handleDeleteTask : undefined}
        isNewTask={!selectedTask}
      />
    </div>
  );
}
