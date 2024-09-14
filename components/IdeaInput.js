/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
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
    <div className="collectionsform">
      {selectedIdeas.length > 0 && (
      <div
        className="d-flex flex-wrap"
        style={{
          margin: '20px', justifyContent: 'center',
        }}
      >
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
        <div
          className="searching"
          style={{
            maxWidth: '400px', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto',
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Ideas..."
            className="form-input"
          />
        </div>
        <div
          className="ideas-collection"
          style={{
            margin: '20px', justifyContent: 'center', overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px', marginTop: '5px',
          }}
        >
          {filteredOptions.length > 0 && (
            <div
              className="d-flex flex-wrap"
              style={{
                margin: '20px', justifyContent: 'center',
              }}
            >
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
    </div>

  );
};

export default MultiSelectIdea;
