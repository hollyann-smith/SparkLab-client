// import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { getIdeas } from '../utils/data/ideaData';
import IdeaCard from '../components/IdeaCard';
import CollectionCard from '../components/CollectionCard';
import { getCollections } from '../utils/data/collectionData';
import { signOut } from '../utils/auth';

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

  const filteredIdeas = ideas.filter((idea) => {
    if (activeTab === 'saved') {
      return idea.saved;
    } if (activeTab === 'created') {
      return idea.user.id === user?.id;
    }
    return true;
  });

  const filteredCollections = collections.filter((collection) => {
    if (activeTab === 'saved') {
      return (null);
    } if (activeTab === 'created') {
      return collection.user?.id === user?.id;
    }
    return true;
  });

  return (
    <>
      <Head>
        <title>USER</title>
      </Head>
      <div className="user">
        <div>
          <h1 className="text-white">{user?.username}</h1>
          {/* <img
            src={user?.fbUser?.photoURL}
            alt={user.displayName || 'User Profile'}
            width={80} // Set width
            height={80} // Set height
            style={{
              borderRadius: '50%', // Make it circular
              objectFit: 'cover', // Ensure it fits within the circle
            }}
          /> */}
          <br />
          <Link href="/user/edit" passHref>
            <button type="button" className="supply-button">edit profile</button>
          </Link>
          <button type="submit" className="supply-button" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
      <br />
      <br />
      <div className="userOptions">
        <button type="button" className="supply-button" onClick={() => setActiveTab('saved')}>
          Saved
        </button>
        <button type="button" className="supply-button" onClick={() => setActiveTab('created')}>
          Created
        </button>

      </div>
      <div className="userpageData">
        <h2 className="text-white">My Ideas:
        </h2>
        <div className="ideaScroll">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} obj={idea} user={user} />
          ))}
        </div>
        <h2 className="text-white"> My Collections:</h2>
        <div className="collectionScroll">
          {filteredCollections.map((collection) => (
            <CollectionCard key={collection.id} obj={collection} user={user} />
          ))}
        </div>
        <h2 className="text-white">My Supplies:</h2>
      </div>
    </>
  );
}
