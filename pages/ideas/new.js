import React from 'react';
// import { useRouter } from 'next/router';
import IdeaForm from '../../components/forms/IdeaForm';
import { useAuth } from '../../utils/context/authContext';

export default function AddIdea() {
  const { user } = useAuth();
  // const router = useRouter();
  return (
    <div>
      <IdeaForm user={user} />
    </div>
  );
}
