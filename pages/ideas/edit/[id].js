import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleIdea } from '../../../utils/data/ideaData';
import IdeaForm from '../../../components/forms/IdeaForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditIdea() {
  const [editIdea, setEditIdea] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSingleIdea(id).then(setEditIdea);
  }, [id]);

  return (
    <IdeaForm obj={editIdea} user={user} />
  );
}
