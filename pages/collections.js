import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { getCollections } from '../utils/data/collectionData';
import CollectionCard from '../components/CollectionCard';

export default function Collections() {
  const [collections, setCollections] = useState([]);

  const getAllCollections = () => {
    getCollections().then(setCollections);
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
        <Link href="/collections/new" passHref>
          <button type="button" className="supply-button">Create Collection</button>
        </Link>
      </div>
      <div style={{ margin: '20px' }} className="d-flex flex-wrap">
        {collections
          .filter((collection) => collection.ideas && collection.ideas.length > 0)
          .map((collection) => (
            <CollectionCard key={collection.id} obj={collection} />
          ))}
      </div>
    </>
  );
}
