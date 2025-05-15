import type { Column } from "../interfaces/task";
import { KanbanModal } from "./KanbanModal";
import { KanbanTask } from "./KanbanTask";
import { useKanban } from "../hooks/useKanban";
import { Card } from "react-bootstrap";
import { useDrop } from "react-dnd";
import { useRef } from "react";
// import { mergeRefs } from "../../../utils/mergeRefs"; // Atualize o caminho conforme necessário

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
    handleMoveTask,
  } = useKanban();

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { taskId: string; columnId: string }) => {
      if (item.columnId !== column.id) {
        handleMoveTask(item.taskId, item.columnId, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Card
        ref={(node) => {
          dropRef(node);
          if (cardRef.current) {
            cardRef.current = node;
          }
        }} // Combina o dropRef com o cardRef
        className="mb-3"
        style={{
          backgroundColor: isOver ? "rgba(0, 123, 255, 0.1)" : "rgb(31, 31, 31)",
        }}
      >
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