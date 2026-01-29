import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-uppercase">
            Quess Corp HRMS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/employees">Employees</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="flex-grow-1 bg-light">
        {children}
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <Container>
          <small>&copy; {new Date().getFullYear()} Quess Corp. HRMS Lite Production Build.</small>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;