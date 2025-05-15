import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import AddIcon from '@mui/icons-material/Add';
import { useKanban } from '../hooks/useKanban';

function KanbanNavbar() {
  const {handleCreateTask} = useKanban();
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Kanban Board</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Button onClick={handleCreateTask} className='d-flex align-items-center' variant="outline-primary">
                Create Task&nbsp;<AddIcon/> 
            </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default KanbanNavbar;