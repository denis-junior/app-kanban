import { useRef } from "react";
import type { Task, TaskStatus } from "../interfaces/task";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDrag } from "react-dnd";

export function KanbanTask({
  task,
  columnId,
  handleEditTask,
  changeStatus,
}: {
  task: Task;
  columnId: string;
  handleEditTask: (taskId: string, columnId: string) => void;
  changeStatus: (taskId: string, status: TaskStatus, direction: "left" | "right") => Promise<void>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "TASK",
    item: { taskId: task.id, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  dragRef(ref); // Connect the drag source to the ref

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        marginBottom: "0.5rem",
      }}
      onDoubleClick={() => handleEditTask(task.id, columnId)}
    >
      <h5>{task.title}</h5>
      {task.description && <p>{task.description}</p>}
      <div className="d-flex justify-content-between">
        <div
          style={{
            visibility: task.status === "pending" ? "hidden" : "visible",
            cursor: "pointer",
          }}
          onClick={() => changeStatus(task.id, task.status || "pending", "left")}
        >
          <KeyboardArrowLeftIcon />
        </div>
        <div style={{ cursor: "pointer" }} onClick={() => handleEditTask(task.id, columnId)}>
          <EditIcon />
        </div>
        <div
          style={{
            visibility: task.status === "done" ? "hidden" : "visible",
            cursor: "pointer",
          }}
          onClick={() => changeStatus(task.id, task.status || "pending", "right")}
        >
          <KeyboardArrowRightIcon />
        </div>
      </div>
    </div>
  );
}
