import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EmployeeService } from '../services/api';
import Loader from '../components/Loader';
import { FaUserPlus, FaUserTie } from 'react-icons/fa';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  
  // New Employee State
  const [newEmp, setNewEmp] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await EmployeeService.getAll();
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch employees.');
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await EmployeeService.create(newEmp);
      setShowModal(false);
      setNewEmp({ employee_id: '', full_name: '', email: '', department: '' });
      fetchEmployees(); // Refresh list
    } catch (err) {
      alert('Error creating employee. Check for duplicates or invalid data.');
    }
  };

  if (loading) return <Loader />;

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Directory</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          <FaUserPlus className="me-2" /> Add Employee
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {employees.length === 0 ? (
          <Col className="text-center py-5">
            <h4>No employees found. Add one to get started!</h4>
          </Col>
        ) : (
          employees.map((emp) => (
            <Col key={emp.id} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm hover-shadow transition">
                <Card.Body className="text-center">
                  <div className="mb-3">
                    <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                         <FaUserTie size={40} className="text-secondary"/>
                    </div>
                  </div>
                  <Card.Title>{emp.full_name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{emp.department}</Card.Subtitle>
                  <Card.Text className="small text-secondary">{emp.email}</Card.Text>
                  <Link to={`/employees/${emp.id}`} className="btn btn-outline-primary btn-sm w-100 mt-2">
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Add Employee Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control required type="text" onChange={(e) => setNewEmp({...newEmp, employee_id: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control required type="text" onChange={(e) => setNewEmp({...newEmp, full_name: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" onChange={(e) => setNewEmp({...newEmp, email: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control required type="text" onChange={(e) => setNewEmp({...newEmp, department: e.target.value})} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Save Employee
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EmployeeList;