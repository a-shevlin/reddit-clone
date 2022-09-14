import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <form action="/" method="get">
    <label htmlFor="header-search">
        <span className="visually-hidden">Search Reddit</span>
    </label>
    <input
        value={searchQuery}
        output={e => setSearchQuery(e.target.value)}
        type="text"
        id="header-search"
        placeholder="Search Reddit"
        name="s"
    />
    <button type="submit">Search</button>
  </form>
);

export default SearchBar;