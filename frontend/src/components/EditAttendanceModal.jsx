import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

/**
 * Reusable modal for editing attendance records
 */
const EditAttendanceModal = ({
  show,
  onClose,
  attendance,
  onChange,
  onSave,
}) => {
  if (!attendance) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Attendance</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSave}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={attendance.date}
              required
              onChange={(e) =>
                onChange({ ...attendance, date: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={attendance.status}
              onChange={(e) =>
                onChange({ ...attendance, status: e.target.value })
              }
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditAttendanceModal;
