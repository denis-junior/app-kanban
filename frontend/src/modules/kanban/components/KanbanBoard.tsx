import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GeneralNavbar from "./KanbanNavbar";
import { useKanban } from "../hooks/useKanban";
import { KanbanColumn } from "./KanbanColumn";
import { Row, Col } from "react-bootstrap";

export function KanbanBoard() {
  const { columns } = useKanban();

  return (
    <DndProvider backend={HTML5Backend}>
      <GeneralNavbar />
      <Row className="p-5 w-100 justify-content-center">
        {columns.map((column) => (
          <Col key={column.id} md={5} lg={3}>
            <KanbanColumn column={column} />
          </Col>
        ))}
      </Row>
    </DndProvider>
  );
}
