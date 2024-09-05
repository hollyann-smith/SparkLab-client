import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleCollection } from '../../utils/data/collectionData';
import IdeaCard from '../../components/IdeaCard';
import { useAuth } from '../../utils/context/authContext';
// import CollectionIdeaCard from '../../components/CollectionIdeaCard';

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
      <div>
        {collection.ideas?.map((idea) => (
          <IdeaCard key={idea.id} obj={idea} user={user} />
        ))}
      </div>
    </>
  );
}
