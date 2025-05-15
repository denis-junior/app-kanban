// src/components/KanbanModal.tsx
import { Modal, Button, type ModalProps } from "react-bootstrap";

interface KanbanModalProps extends ModalProps {
  title: string;
  body: React.ReactNode;
  onConfirm?: () => void;
  onDelete?: () => Promise<void>;
  confirmText?: string;
  closeText?: string;
}

export const KanbanModal = ({
  title,
  body,
  onConfirm,
  onDelete,
  confirmText = "Confirmar",
  closeText = "Fechar",
  ...modalProps
}: KanbanModalProps) => {
  return (
    <Modal {...modalProps}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={modalProps.onHide}>
          {closeText}
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
        {onConfirm && (
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
