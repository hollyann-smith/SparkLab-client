/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { createSupply } from '../utils/data/ideaData';

const MultiSelectDropdown = ({ supplies, onSelect, selectedSupplies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState(supplies);

  useEffect(() => {
    setOptions(supplies);
  }, [supplies]);

  const handleOptionClick = (supply) => {
    const isSelected = selectedSupplies.some((s) => s.id === supply.id);
    let updatedSupplies;
    if (isSelected) {
      updatedSupplies = selectedSupplies.filter((s) => s.id !== supply.id);
    } else {
      updatedSupplies = [...selectedSupplies, supply];
    }
    onSelect(updatedSupplies);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCreateTag = () => {
    if (searchTerm && !options.some((s) => s.name === searchTerm)) {
      const newSupply = { name: searchTerm };
      // Call createSupply to save the new supply to the backend
      createSupply(newSupply).then((createdSupply) => {
        // Update options with the newly created supply from the backend
        setOptions([...options, createdSupply]);
        // Update the selected supplies with the new supply
        onSelect([...selectedSupplies, createdSupply]);
        // Clear the search term
        setSearchTerm('');
      }).catch((error) => {
        console.error('Error creating supply:', error);
        // Handle error if needed, such as displaying an error message
      });
    }
  };

  const filteredOptions = options.filter((option) => option.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="form">
      {selectedSupplies.length > 0 && (
      <div className="form-list-item">
        {selectedSupplies.map((supply) => (
          <button type="button" key={supply.id} className="form-list-item-selected">
            {supply.name}
            <span
              className="remove-tag"
              onClick={() => handleOptionClick(supply)}
            >
              &times;
            </span>
          </button>
        ))}
      </div>
      )}
      <div className="multi-select-dropdown">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search or create new supply"
          className="form-input"
        />
        <button
          type="button"
          onClick={handleCreateTag}
          className="form-button"
        >
          Create Supply
        </button>
        {filteredOptions.length > 0 && (
        <div className="form-list">
          {filteredOptions.filter((option) => !selectedSupplies.some((s) => s.id === option.id)).map((option) => (
            <button
              type="button"
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={`form-list-item ${selectedSupplies.some((s) => s.id === option.id) ? 'selected' : ''}`}
            >
              {option.name}
            </button>
          ))}
        </div>
        )}
      </div>
    </div>

  );
};

export default MultiSelectDropdown;
