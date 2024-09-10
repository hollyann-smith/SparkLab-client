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
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  console.warn('navUser', user.fbUser.photoURL);
  return (
    <Navbar collapseOnSelect expand="lg" bg="E0DED8" variant="dark" className="navbar-bottom">
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
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/home">
              <Nav.Link className="text-white">Home</Nav.Link>
            </Link>
            <Link passHref href="/ideas">
              <Nav.Link className="text-white">Explore Ideas</Nav.Link>
            </Link>
            <Link passHref href="/collections">
              <Nav.Link className="text-white">Explore Collections</Nav.Link>
            </Link>
            {/* <Link passHref href="/ideas/new">
              <Nav.Link className="text-black">Create Ideas</Nav.Link>
            </Link>
            <Link passHref href="/collections/new">
              <Nav.Link className="text-black">Create Collections</Nav.Link>
            </Link> */}
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
            {/* <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
