import { Modal, Button, Form, type ModalProps } from "react-bootstrap";

interface KanbanModalProps extends ModalProps {
  title: string;
  editedTitle: string;
  editedDescription: string;
  onChangeEditTask: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onConfirm?: () => void;
  onDelete?: () => Promise<void>;
  confirmText?: string;
  closeText?: string;
  isNewTask: boolean; // Indica se é uma nova tarefa
}

export const KanbanModal = ({
  title,
  editedTitle,
  editedDescription,
  onChangeEditTask,
  onConfirm,
  onDelete,
  confirmText = "Confirmar",
  closeText = "Fechar",
  isNewTask,
  ...modalProps
}: KanbanModalProps) => {
  return (
    <Modal {...modalProps}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="taskTitle">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="task-title"
              value={editedTitle}
              onChange={onChangeEditTask}
              placeholder="Digite o título da tarefa"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="taskDescription">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              name="task-description"
              value={editedDescription}
              onChange={onChangeEditTask}
              placeholder="Digite a descrição da tarefa"
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={modalProps.onHide}>
          {closeText}
        </Button>
        {!isNewTask && (
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        )}
        {onConfirm && (
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};