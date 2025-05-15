import GeneralNavbar from "./KanbanNavbar";
import { useKanban } from "../hooks/useKanban";
import { KanbanColumn } from "./KanbanColumn";
import { Row, Col } from "react-bootstrap";

export function KanbanBoard() {
  const { columns } = useKanban();

  return (
    <>
      <GeneralNavbar />
      <Row className="p-5 w-100 justify-content-center">
        {columns.map((column) => (
          <Col
            key={column.id}
            // xs={12} // Ocupa toda a largura em telas muito pequenas
            // sm={8} // Ocupa metade da largura em telas pequenas
            md={5} // Ocupa um terço da largura em telas médias
            lg={3} // Ocupa um quarto da largura em telas grandes
          >
            <KanbanColumn column={column} />
          </Col>
        ))}
      </Row>
    </>
  );
}
