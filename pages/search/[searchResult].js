/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getIdeas } from '../../utils/data/ideaData';
import IdeaCard from '../../components/IdeaCard';
import CollectionCard from '../../components/CollectionCard';
import SearchBar from '../../components/SearchBar';
import { getCollections } from '../../utils/data/collectionData';

export default function SearchPage() {
  const [searchIdeas, setSearchIdeas] = useState([]);
  const [searchCollections, setSearchCollections] = useState([]);
  const router = useRouter();
  const { searchResult } = router.query;

  const searchAllIdeas = useCallback(() => {
    getIdeas().then((ideas) => {
      const filteredIdeas = ideas.filter((idea) => {
        const matchesName = idea.title.toLowerCase().includes(searchResult.toLowerCase());
        const matchesSupplies = idea.supplies.some((supply) => supply.name.toLowerCase().includes(searchResult.toLowerCase()));
        return matchesName || matchesSupplies;
      });
      setSearchIdeas(filteredIdeas);
    });
  }, [searchResult]);

  const searchAllCollections = useCallback(() => {
    getCollections().then((collections) => {
      const filteredCollections = collections.filter((collection) => collection.name.toLowerCase().includes(searchResult.toLowerCase()));
      setSearchCollections(filteredCollections);
    });
  }, [searchResult]);

  useEffect(() => {
    searchAllIdeas();
    searchAllCollections(); // Add the collection search

    return () => {
      setSearchIdeas([]);
      setSearchCollections([]); // Clear collections when search changes
    };
  }, [searchAllIdeas, searchAllCollections]);

  return (
    <>
      <SearchBar />
      <div>
        <div
          className="back-group"
          style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '50px',
          }}
        >
          <Link href="/ideas" passHref>
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
          {searchIdeas.map((idea) => <IdeaCard key={idea.id} obj={idea} />)}
          {searchCollections.map((collection) => <CollectionCard key={collection.id} obj={collection} />)}
        </div>
      </div>
    </>

  );
}
