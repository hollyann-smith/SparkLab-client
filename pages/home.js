import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import IdeaCard from '../components/IdeaCard';
import { getIdeas } from '../utils/data/ideaData';

export default function Idea() {
  const [randomIdea, setRandomIdea] = useState(null);

  const getRandomIdea = () => {
    getIdeas().then((fetchedIdeas) => {
      const randomIndex = Math.floor(Math.random() * fetchedIdeas.length);
      setRandomIdea(fetchedIdeas[randomIndex]);
    });
  };

  useEffect(() => {
    getRandomIdea();
  }, [setRandomIdea]);

  return (
    <>
      <div>
        <h1>A SPARK OF CREATIVITY!</h1>
      </div>
      <div className="text-center my-4">
        <Link href="/home" passHref>
          <Button onClick={getRandomIdea}>Give me a Spark!</Button>
        </Link>
      </div>
      <div style={{ margin: '20px' }} className="d-flex flex-wrap">
        {randomIdea && <IdeaCard key={randomIdea.id} obj={randomIdea} />}
      </div>
    </>
  );
}
