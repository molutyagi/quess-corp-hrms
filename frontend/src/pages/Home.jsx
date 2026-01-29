import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUsers, FaChartLine, FaCheckCircle } from 'react-icons/fa';

const Home = () => {
  return (
    <Container fluid className="p-0">
      {/* Hero Section */}
      <div 
        className="text-white text-center d-flex align-items-center justify-content-center" 
        style={{ 
          background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh'
        }}
      >
        <div>
          <h1 className="display-3 fw-bold mb-3">Quess Corp HRMS</h1>
          <p className="lead mb-4">Streamlining Workforce Management & Attendance</p>
          <Button as={Link} to="/employees" variant="primary" size="lg" className="px-5">
            View Employees
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="text-center">
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-3">
              <Card.Body>
                <FaUsers size={50} className="text-primary mb-3" />
                <Card.Title>Employee Management</Card.Title>
                <Card.Text>Easily add, update, and manage employee records in a centralized database.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-3">
              <Card.Body>
                <FaCheckCircle size={50} className="text-success mb-3" />
                <Card.Title>Attendance Tracking</Card.Title>
                <Card.Text>Mark daily attendance and track history with precision and ease.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-3">
              <Card.Body>
                <FaChartLine size={50} className="text-warning mb-3" />
                <Card.Title>Real-time Insights</Card.Title>
                <Card.Text>Get immediate access to workforce status and operational data.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;