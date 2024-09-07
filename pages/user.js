// import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getIdeas } from '../utils/data/ideaData';
import IdeaCard from '../components/IdeaCard';
import CollectionCard from '../components/CollectionCard';
import { getCollections } from '../utils/data/collectionData';

export default function UserPage() {
  const [ideas, setIdeas] = useState([]);
  const [collections, setCollections] = useState([]);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('saved');

  const getAllCollections = () => {
    getCollections().then(setCollections);
  };
  useEffect(() => {
    getAllCollections();
  }, []);

  const getAllIdeas = () => {
    getIdeas().then(setIdeas);
  };
  useEffect(() => {
    getAllIdeas();
  }, []);

  const filteredIdeas = ideas.filter((idea, collection) => {
    if (activeTab === 'saved') {
      return idea.saved;
    } if (activeTab === 'created') {
      return idea.user.id || collection.user.id === user?.id;
    }
    return true;
  });

  const filteredCollections = collections.filter((collection) => {
    if (activeTab === 'created') {
      return collection.user?.id === user?.id;
    }
    return true;
  });

  return (
    <>
      <div>
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
        <h1>{user?.username}</h1>
        <Link href="/user/edit" passHref>
          <button type="button">edit profile</button>
        </Link>
      </div>
      <div>
        <button type="button" onClick={() => setActiveTab('saved')}>
          Saved
        </button>
        <button type="button" onClick={() => setActiveTab('created')}>
          Created
        </button>
      </div>
      <div className="userpage">
        <div>
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} obj={idea} user={user} />
          ))}
        </div>
        <div>
          {filteredCollections.map((collection) => (
            <CollectionCard key={collection.id} obj={collection} user={user} />
          ))}
        </div>
      </div>
    </>
  );
}
