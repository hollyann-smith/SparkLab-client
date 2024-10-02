/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import logo from '../public/slo.png';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="E0DED8" variant="dark" className="nav justify-content-between">
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
          <Nav className="me-auto">
            <Link passHref href="/ideas">
              <Nav.Link className="text-white fs-5">Ideas</Nav.Link>
            </Link>
            <Link passHref href="/collections">
              <Nav.Link className="text-white fs-5">Collections</Nav.Link>
            </Link>
          </Nav>
          <div className="navbar-logo">
            <Link passHref href="/">
              <Navbar.Brand className="d-flex justify-content-center align-items-center">
                <Image
                  src={logo}
                  className="img"
                  height={50}
                  width={220}
                  alt="SPARK LAB"
                />
              </Navbar.Brand>
            </Link>
          </div>
          <Nav className="ms-auto">
            <Link passHref href="/user">
              <Nav.Link className="text-white fs-5">
                <div className="user-avatar">
                  My Space
                </div>
              </Nav.Link>
            </Link>
            <button type="submit" className="supply-button" onClick={signOut}>Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
