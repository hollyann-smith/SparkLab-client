import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { getCollections } from '../utils/data/collectionData';
import CollectionCard from '../components/CollectionCard';
import SearchBar from '../components/SearchBar';

export default function Collections() {
  const [collections, setCollections] = useState([]);

  const getAllCollections = async () => {
    try {
      const collectionsData = await getCollections();
      setCollections(collectionsData);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  useEffect(() => {
    getAllCollections();
  }, []);

  return (
    <>
      <Head>
        <title>COLLECTIONS</title>
      </Head>
      <div className="text-center my-4">
        <SearchBar />
        <Link href="/collections/new" passHref>
          <button type="button" className="supply-button">Create Collection</button>
        </Link>
      </div>
      <div style={{ margin: '20px', justifyContent: 'center' }} className="d-flex flex-wrap">
        {collections
          .filter((collection) => collection.ideas && collection.ideas.length > 0)
          .map((collection) => (
            <CollectionCard key={collection.id} obj={collection} />
          ))}
      </div>
    </>
  );
}
