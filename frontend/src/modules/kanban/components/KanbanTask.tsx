import type { Task } from "../interfaces/task";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export function KanbanTask({
  task,
  columnId,
  handleEditTask,
}: {
  task: Task;
  columnId: string;
  handleEditTask: (taskId: string, columnId: string) => void;
}) {
  return (
    <div
      style={{
        padding: "0.5rem",
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <h4>{task.title}</h4>
      {task.description && <p>{task.description}</p>}
      <div className="d-flex justify-content-between">
        <div
          style={{
            visibility: task.status === "pending" ? "hidden" : "visible",
          }}
        >
          <KeyboardArrowLeftIcon />
        </div>
        <div onClick={() => handleEditTask(task.id, columnId)}>
          <EditIcon />
        </div>
        <div
          style={{
            visibility: task.status === "done" ? "hidden" : "visible",
          }}
        >
          <KeyboardArrowRightIcon />
        </div>
      </div>
    </div>
  );
}
