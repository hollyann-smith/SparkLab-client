import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import IdeaCard from '../components/IdeaCard';
import { getIdeas } from '../utils/data/ideaData';

export default function Idea() {
  const [ideas, setIdeas] = useState([]);

  const getAllActivities = () => {
    getIdeas().then(setIdeas);
  };
  useEffect(() => {
    getAllActivities();
  }, []);
  return (
    <>
      <Head>
        <title>IDEA</title>
      </Head>
      <div className="text-center my-4">
        <Link href="/idea/new" passHref>
          <Button>Add IDEA</Button>
        </Link>
      </div>
      <div style={{ margin: '20px' }} className="d-flex flex-wrap">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} obj={idea} />
        ))}
      </div>
    </>
  );
}
