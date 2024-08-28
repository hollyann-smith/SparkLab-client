import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getIdeas } from '../../utils/data/ideaData';
import IdeaCard from '../../components/IdeaCard';
import SearchBar from '../../components/SearchBar';

export default function SearchPage() {
  const [searchIdeas, setSearchIdeas] = useState([]);
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

  useEffect(() => {
    searchAllIdeas();

    return () => {
      setSearchIdeas([]);
    };
  }, [searchAllIdeas]);

  return (
    <>
      <SearchBar />
      <div className="d-flex flex-wrap">
        {searchIdeas.map((idea) => <IdeaCard key={idea.id} obj={idea} />)}
      </div>
    </>

  );
}
