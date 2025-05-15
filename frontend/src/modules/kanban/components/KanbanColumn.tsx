import type { Column } from "../interfaces/task";
import { KanbanModal } from "./KanbanModal";
import { KanbanTask } from "./KanbanTask";
import { useKanban } from "../hooks/useKanban";
import { Card } from "react-bootstrap";

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
    selectedTask,
  } = useKanban();

  return (
    <>
      <Card className="mb-3" style={{ backgroundColor: "rgb(31, 31, 31)" }}>
        <Card.Body>
          <h2 className="text-white">{column.title}</h2>
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
        </Card.Body>
      </Card>

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
    </>
  );
}