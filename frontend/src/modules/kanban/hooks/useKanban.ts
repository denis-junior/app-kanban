// src/modules/kanban/hooks/useKanban.ts
import { useContext } from 'react';
import { KanbanContext } from '../contexts/KanbanContext';

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
};