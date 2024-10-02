/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { deleteSingleSupply, getIdeas, getSupplies } from '../utils/data/ideaData';
import IdeaCard from '../components/IdeaCard';
import CollectionCard from '../components/CollectionCard';
import { getCollections } from '../utils/data/collectionData';
import UsernameModal from '../components/UsernameModal';

export default function UserPage() {
  const [ideas, setIdeas] = useState([]);
  const [collections, setCollections] = useState([]);
  const [activeTab, setActiveTab] = useState('saved');
  const { user } = useAuth();

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

  const userCreatedIdeas = ideas.filter((idea) => idea.user.id === user?.id);

  const userSupplies = [];
  userCreatedIdeas.forEach((idea) => {
    idea.supplies.forEach((supply) => {
      if (!userSupplies.some((item) => item.id === supply.id)) {
        userSupplies.push(supply);
      }
    });
  });

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

  const deleteSupply = async (supplyId) => {
    if (window.confirm('Are you sure you want to delete this supply?')) {
      try {
        await deleteSingleSupply(supplyId);
        getSupplies();
      } catch (error) {
        console.error('Failed to delete the supply', error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>USER</title>
      </Head>
      <div className="edit-user">
        <h1 className="text-white">{user?.username}</h1>
        <UsernameModal />
      </div>
      <div className="user" />
      <div className="userOptions">
        <button type="button" className="supply-button" onClick={() => setActiveTab('saved')}>
          Saved
        </button>
        <button type="button" className="supply-button" onClick={() => setActiveTab('created')}>
          Created
        </button>

      </div>
      <div className="userpageData">
        <h2 className="text-white">{activeTab === 'saved' ? 'Saved Ideas:' : 'My Ideas:'}
        </h2>
        <div className="ideaScroll">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} obj={idea} user={user} />
          ))}
        </div>
        <h2 className="text-white">{activeTab === 'saved' ? '' : 'My Collections:'}</h2>
        <div className="collectionScroll">
          {filteredCollections.map((collection) => (
            <CollectionCard key={collection.id} obj={collection} user={user} />
          ))}
        </div>
        {activeTab === 'created' && (
          <>
            <h2 className="text-white">My Supplies:</h2>
            <div className="supplyScroll">
              {userSupplies.map((supply) => (
                <button
                  className="supply-user"
                  type="button"
                  key={supply.id}
                  onClick={() => deleteSupply(supply.id)}
                >
                  {supply.name}
                  <span className="remove-tag">&times;</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
