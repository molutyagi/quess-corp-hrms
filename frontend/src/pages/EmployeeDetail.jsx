import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Alert } from 'react-bootstrap';
import { EmployeeService, AttendanceService } from '../services/api';
import Loader from '../components/Loader';
import EditAttendanceModal from "../components/EditAttendanceModal";


const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Update States
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [attendanceData, setAttendanceData] = useState({ date: '', status: 'Present' });

  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [filterDates, setFilterDates] = useState({from: "", to: "", });

  const totalPresentDays = attendance.filter((record) => record.status === "Present").length;

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
  
      const [empRes, attRes] = await Promise.all([
        EmployeeService.getById(id),
        AttendanceService.getByEmployee(id, {
          from: filterDates.from || undefined,
          to: filterDates.to || undefined,
        }),
      ]);
  
      setEmployee(empRes.data);
  
      setFormData({
        employee_id: empRes.data.employee_id,
        full_name: empRes.data.full_name,
        email: empRes.data.email,
        department: empRes.data.department,
      });
  
      setAttendance(attRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    try {
      await EmployeeService.update(id, formData);
      setEmployee(formData);
      setEditMode(false);
      alert('Employee details updated!');
    } catch (err) {
      alert('Failed to update employee.');
    }
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      await AttendanceService.mark({ ...attendanceData, employee: id });
      loadData();
      alert('Attendance marked!');
    } catch (err) {
      alert('Error marking attendance.');
    }
  };

  
  const openEditAttendance = (record) => {
    setEditingAttendance({
      id: record.id,
      date: record.date,
      status: record.status,
    });
    setShowAttendanceModal(true);
  };
  
  const handleUpdateAttendance = async (e) => {
    e.preventDefault();
  
    try {
      await AttendanceService.update(editingAttendance.id, {
        date: editingAttendance.date,
        status: editingAttendance.status,
      });
  
      setShowAttendanceModal(false);
      setEditingAttendance(null);
      loadData();
  
      alert("Attendance updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update attendance.");
    }
  };
  
  

  const handleDelete = async () => {
    if(window.confirm("Are you sure? This cannot be undone.")) {
        await EmployeeService.delete(id);
        navigate('/employees');
    }
  }

  if (loading) return <Loader />;
  if (!employee) return <Alert variant="danger">Employee not found.</Alert>;

  return (
    <Container className="py-5">
      <Row>
        {/* Left Column: Employee Details */}
        <Col md={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Profile</h5>
              <Button variant="light" size="sm" onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleUpdateEmployee}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={formData.full_name} 
                    disabled={!editMode}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    value={formData.email} 
                    disabled={!editMode}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={formData.department} 
                    disabled={!editMode}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  />
                </Form.Group>
                {editMode && (
                  <div className="d-grid gap-2">
                    <Button variant="success" type="submit">Save Changes</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete Employee</Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column: Attendance */}
        <Col md={8}>
          <Card className="shadow-sm">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Attendance History</h5>
            <Badge bg="success">
              Present Days: {totalPresentDays}
            </Badge>
          </Card.Header>

            <Card.Body>
              {/* Mark Attendance Form */}
              <Form onSubmit={handleMarkAttendance} className="row g-3 align-items-end mb-4 border-bottom pb-4">
                <Col md={5}>
                  <Form.Label>Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    required 
                    onChange={(e) => setAttendanceData({...attendanceData, date: e.target.value})}
                  />
                </Col>
                <Col md={4}>
                  <Form.Label>Status</Form.Label>
                  <Form.Select 
                    onChange={(e) => setAttendanceData({...attendanceData, status: e.target.value})}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Button type="submit" variant="primary" className="w-100">Mark</Button>
                </Col>
              </Form>

              {/* 🔍 Attendance Filter */}
              <Form className="row g-3 mb-3">
                <Col md={4}>
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="date"
                    value={filterDates.from}
                    onChange={(e) =>
                      setFilterDates({ ...filterDates, from: e.target.value })
                    }
                  />
                </Col>

                <Col md={4}>
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="date"
                    value={filterDates.to}
                    onChange={(e) =>
                      setFilterDates({ ...filterDates, to: e.target.value })
                    }
                  />
                </Col>

                <Col md={4} className="d-flex align-items-end">
                  <Button
                    variant="secondary"
                    className="w-100"
                    onClick={loadData}
                  >
                    Apply Filter
                  </Button>
                </Col>
              </Form>

              {/* Attendance Table */}
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((record) => (
                      <tr key={record.id}>
                        <td>{record.date}</td>
                        <td>
                          <Badge bg={record.status === 'Present' ? 'success' : 'danger'}>
                            {record.status}
                          </Badge>
                        </td>
                        <td>
                          
                        <Button size="sm" variant="outline-secondary" onClick={() => openEditAttendance(record)}> Edit </Button>

                        </td>
                      </tr>
                    ))}
                    {attendance.length === 0 && (
                      <tr>
                        <td colSpan="3" className="text-center text-muted">No attendance records found.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <EditAttendanceModal
       show={showAttendanceModal} onClose={() => setShowAttendanceModal(false)} attendance={editingAttendance} onChange={setEditingAttendance} onSave={handleUpdateAttendance}
      />


    </Container>
    
  );
};

export default EmployeeDetail;