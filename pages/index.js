import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import IdeaCard from '../components/IdeaCard';
import { getIdeas } from '../utils/data/ideaData';
import { useAuth } from '../utils/context/authContext';
import SearchBar from '../components/SearchBar';

export default function Idea() {
  const [randomIdea, setRandomIdea] = useState(null);
  const [isSparkling, setIsSparkling] = useState(false);
  const { user } = useAuth();

  const getRandomIdea = () => {
    setIsSparkling(true);
    getIdeas().then((fetchedIdeas) => {
      const randomIndex = Math.floor(Math.random() * fetchedIdeas.length);
      setRandomIdea(fetchedIdeas[randomIndex]);
    });
    setTimeout(() => {
      setIsSparkling(false);
    }, 600);
  };

  useEffect(() => {
    getRandomIdea();
  }, [setRandomIdea]);

  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      <SearchBar />
      <div
        className="center-container"
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', gap: '80px', marginTop: ' 50px',
        }}
      >
        <div className="text-center my-4">
          <Link href="/" passHref>
            <button type="button" className="supply-button" onClick={getRandomIdea}>
              Give me a Spark!
            </button>
          </Link>
        </div>
        <div className="scale-container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={`Sbutton ${isSparkling ? 'spark' : ''}`} style={{ maxWidth: '300px' }}>
            <div style={{
              margin: '0', padding: '0', display: 'flex', justifyContent: 'center',
            }}
            >
              {randomIdea && <IdeaCard key={randomIdea.id} obj={randomIdea} user={user} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
