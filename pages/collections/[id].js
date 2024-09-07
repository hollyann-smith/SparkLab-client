import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSingleCollection } from '../../utils/data/collectionData';
import IdeaCard from '../../components/IdeaCard';
import { useAuth } from '../../utils/context/authContext';

export default function ViewSingleCollection() {
  const [collection, setCollection] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      getSingleCollection(id).then(setCollection);
    }
    console.warn('collection', collection);
  }, [id]);

  return (
    <>
      <h1>{collection.name}</h1>
      {user && collection?.user?.uid === user?.uid ? (
        <Link href={`edit/${collection.id}`} passHref>
          <button type="button">EDIT</button>
        </Link>
      ) : ('')}
      <div>
        {collection.ideas?.map((idea) => (
          <IdeaCard key={idea.id} obj={idea} user={user} />
        ))}
      </div>
    </>
  );
}
