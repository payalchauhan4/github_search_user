import React from 'react';

const UserSearch = ({ username, setUsername, fetchUserData, clearSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData();
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={clearSearch}>Clear Search</button>
    </div>
  );
};

export default UserSearch;
