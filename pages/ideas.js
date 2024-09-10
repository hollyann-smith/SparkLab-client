import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import IdeaCard from '../components/IdeaCard';
import { getIdeas } from '../utils/data/ideaData';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../utils/context/authContext';

export default function Idea() {
  const [ideas, setIdeas] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const getAllIdeas = () => {
    getIdeas().then(setIdeas);
  };
  useEffect(() => {
    getAllIdeas();
  }, []);
  return (
    <>
      <Head>
        <title>IDEA</title>
      </Head>
      <SearchBar />
      <div className="text-center my-4">
        <Link href="/ideas/new" passHref>
          <button type="button" className="supply-button">Add Idea!</button>
        </Link>
      </div>
      <div style={{ margin: '20px' }} className="d-flex flex-wrap">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} obj={idea} user={user} ideaId={id} />
        ))}
      </div>
    </>
  );
}
