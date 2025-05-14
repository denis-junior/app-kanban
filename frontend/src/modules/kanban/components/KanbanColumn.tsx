// src/modules/kanban/components/KanbanColumn.tsx
import { useKanban } from '../hooks/useKanban';
import type { Column } from '../interfaces/task';
import { KanbanTask } from './KanbanTask';

export function KanbanColumn({ column }: { column: Column }) {
  const { moveTask } = useKanban();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    moveTask(taskId, column.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        flex: 1,
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
      }}
    >
      <h2>{column.title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {column.tasks.map(task => (
          <KanbanTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}