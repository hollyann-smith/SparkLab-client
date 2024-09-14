/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import CollectionForm from '../../components/forms/CollectionForm';

export default function AddCollection() {
  const { user } = useAuth();
  return (
    <div>
      <div
        className="back-group"
        style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Link href="/collections" passHref>
          <button
            type="button"
            className="back-button"
            style={{
              maxHeight: '60px', maxWidth: '60px', justifyContent: 'center', background: 'transparent', border: 'none', marginRight: '20px',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </button>
        </Link>
        <CollectionForm user={user} />
      </div>
    </div>
  );
}
