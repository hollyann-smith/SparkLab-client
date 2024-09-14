import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleCollection } from '../../../utils/data/collectionData';
import CollectionForm from '../../../components/forms/CollectionForm';

export default function EditCollection() {
  const [editCollection, setEditCollection] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSingleCollection(id).then(setEditCollection);
  }, [id]);

  return (
    <div>
      <CollectionForm obj={editCollection} user={user} />
    </div>
  );
}
