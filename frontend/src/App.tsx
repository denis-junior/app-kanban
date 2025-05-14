import './App.css'
import { KanbanProvider } from './modules/kanban/contexts/KanbanContext'
import { KanbanBoard } from './modules/kanban/components/KanbanBoard'

function App() {

  return (
    <KanbanProvider>
      <KanbanBoard />
    </KanbanProvider>
  );
}

export default App
