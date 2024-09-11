/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import logo from '../public/slo.png';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  console.warn('navUser', user.fbUser.photoURL);
  return (
    <Navbar collapseOnSelect expand="lg" bg="E0DED8" variant="dark" className="navbar">
      <Container>
        <Link passHref href="/home">
          <Navbar.Brand>
            <Image
              src={logo}
              className="img"
              height={50}
              width={220}
              alt="SPARK LAB"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto text-black">
            <Link passHref href="/home">
              <Nav.Link className="text-white">Home</Nav.Link>
            </Link>
            <Link passHref href="/ideas">
              <Nav.Link className="text-white">Explore Ideas</Nav.Link>
            </Link>
            <Link passHref href="/collections">
              <Nav.Link className="text-white">Explore Collections</Nav.Link>
            </Link>
            <Link passHref href="/user">
              <Nav.Link className="text-black">
                <div className="user-avatar">
                  {/* Use Next.js Image component */}
                  <img
                    src={user?.fbUser?.photoURL}
                    alt={user.displayName || 'User Profile'}
                    width={40} // Set width
                    height={40} // Set height
                    style={{
                      borderRadius: '50%', // Make it circular
                      objectFit: 'cover', // Ensure it fits within the circle
                    }}
                  />
                </div>
              </Nav.Link>
            </Link>
            <button type="submit" className="supply-button" onClick={signOut}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
              </svg>
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
