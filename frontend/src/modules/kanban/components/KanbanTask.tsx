import type { Task } from "../interfaces/task";

export function KanbanTask({ task }: { task: Task }) {

  return (
    <div
      style={{
        padding: "0.5rem",
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        cursor: "grab",
      }}
    >
      <h4>{task.title}</h4>
      {task.description && <p>{task.description}</p>}
    </div>
  );
}
