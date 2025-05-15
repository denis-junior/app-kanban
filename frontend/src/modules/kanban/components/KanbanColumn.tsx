import type { Column } from "../interfaces/task";
import { KanbanModal } from "./KanbanModal";
import { KanbanTask } from "./KanbanTask";
import { Form } from "react-bootstrap";
import { useKanban } from "../hooks/useKanban";

export function KanbanColumn({ column }: { column: Column }) {
  const {
    handleEditTask,
    isOpen,
    selectedTask,
    onChangeEditTask,
    editedTitle,
    editedDescription,
    handleSaveChanges,
    close,
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
          />
        ))}
      </div>

      <KanbanModal
        show={isOpen}
        onHide={close}
        backdrop="static"
        title="Editar Tarefa"
        body={
          selectedTask ? (
            <div>
              <div className="mb-3">
                <label htmlFor="task-title" className="form-label">
                  Título
                </label>
                <Form.Control
                  name="task-title"
                  type="text"
                  value={editedTitle}
                  onChange={onChangeEditTask}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="task-description" className="form-label">
                  Descrição
                </label>
                <Form.Control
                  name="task-description"
                  as="textarea"
                  rows={3}
                  value={editedDescription}
                  onChange={onChangeEditTask}
                />
              </div>
            </div>
          ) : (
            "Carregando..."
          )
        }
        onConfirm={handleSaveChanges}
        confirmText="Salvar"
      />
    </div>
  );
}
