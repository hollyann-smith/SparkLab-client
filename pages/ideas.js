import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import IdeaCard from '../components/IdeaCard';
import { getIdeas } from '../utils/data/ideaData';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../utils/context/authContext';

export default function Idea() {
  const [ideas, setIdeas] = useState([]);
  const { user } = useAuth();

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
          <Button>Add IDEA</Button>
        </Link>
      </div>
      <div style={{ margin: '20px' }} className="d-flex flex-wrap">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} obj={idea} user={user} />
        ))}
      </div>
    </>
  );
}
