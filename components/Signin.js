import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { signIn } from '../utils/auth';
import logo from '../public/bigslo.png';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '400px',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
        color: 'white',
      }}
    >
      <Image
        src={logo}
        className="img"
        height={250}
        width={200}
        alt="SPARK LAB"
      />
      <br />
      <Button type="button" size="lg" className="supply-button" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
