/* eslint-disable jsx-a11y/control-has-associated-label */
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
      <div className="edit-collection">
        <h1 className="text-white">{collection.name}   </h1>
        <br />
        {user && collection?.user?.uid === user?.uid ? (
          <Link href={`edit/${collection.id}`} passHref>
            <button type="button" className="btttnn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
              </svg>
            </button>
          </Link>

        ) : ('')}
      </div>
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
        <div style={{ margin: '20px', justifyContent: 'center' }} className="d-flex flex-wrap">
          {collection.ideas?.map((idea) => (
            <IdeaCard key={idea.id} obj={idea} user={user} />
          ))}
        </div>
      </div>
    </>
  );
}
