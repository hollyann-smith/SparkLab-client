import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '') router.push(`/search/${searchInput}`);
    setSearchInput('');
  };
  return (
    <Form className="search-bar" onSubmit={handleSubmit} style={{ marginTop: '20px', marginBottom: '20px' }}>
      <FormControl
        type="text"
        size="sm"
        onChange={handleChange}
        value={searchInput}
        placeholder="Search by keyword or supplies..."
      />
      <button type="submit" className="search-button">Search</button>
    </Form>

  );
}
