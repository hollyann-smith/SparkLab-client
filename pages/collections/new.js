import React from 'react';
import { useAuth } from '../../utils/context/authContext';
import CollectionForm from '../../components/forms/CollectionForm';

export default function AddCollection() {
  const { user } = useAuth();
  return (
    <div>
      <CollectionForm user={user} />
    </div>
  );
}
