/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import CollectionFormIdeaCard from './CollectionFormIdeaCard';

const MultiSelectIdea = ({ ideas, onSelect, selectedIdeas }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState(ideas);

  useEffect(() => {
    setOptions(ideas);
  }, [ideas]);

  const handleOptionClick = (idea) => {
    const isSelected = selectedIdeas.some((s) => s.id === idea.id);
    let updatedideas;
    if (isSelected) {
      updatedideas = selectedIdeas.filter((s) => s.id !== idea.id);
    } else {
      updatedideas = [...selectedIdeas, idea];
    }
    onSelect(updatedideas);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = options.filter((option) => option.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="form">
      {selectedIdeas.length > 0 && (
      <div className="form-list-item">
        {selectedIdeas.map((idea) => (
          <CollectionFormIdeaCard
            key={idea.id}
            obj={idea}
            onClick={() => handleOptionClick(idea)}
          />
        ))}
      </div>
      )}
      <div className="multi-select-dropdown">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Ideas..."
          className="form-input"
        />
        <Button variant="primary" type="submit" className="form-submit-button">
          Submit
        </Button>
        {filteredOptions.length > 0 && (
        <div className="form-list">
          {filteredOptions
            .filter((option) => !selectedIdeas.some((s) => s.id === option.id))
            .map((option) => (
              <CollectionFormIdeaCard
                key={option.id}
                obj={option}
                onClick={() => handleOptionClick(option)}
                className={`form-list-item ${selectedIdeas.some((s) => s.id === option.id) ? 'selected' : ''}`}
              />
            ))}
        </div>
        )}
      </div>
    </div>

  );
};

export default MultiSelectIdea;
