import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Menu.css";

export default function Menu() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar expand={false} expanded={expanded}>
      <Container>
        <div className="navbar-logo navbar-response"></div>
        <Navbar.Brand className="navbar-response">
          Podaci o objektima sigurnosti plovidbe
        </Navbar.Brand>
        <Navbar.Toggle
          className="navbar-response"
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-response">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              Početna
            </Nav.Link>
            <Nav.Link as={Link} to="/table" onClick={() => setExpanded(false)}>
              Tablični prikaz
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
