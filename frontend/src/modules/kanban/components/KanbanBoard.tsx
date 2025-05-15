import GeneralNavbar from "./KanbanNavbar";
import { useKanban } from "../hooks/useKanban";
import { KanbanColumn } from "./KanbanColumn";

export function KanbanBoard() {
  const { columns } = useKanban();

  return (
    <>
      <GeneralNavbar />
      <div
        className="kanban-board"
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {columns.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>
    </>
  );
}
