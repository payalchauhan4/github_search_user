import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import UserSearch from './components/UserSearch';
import UserProfile from './components/userProfile';
import RepositoryList from './components/repositoryList';

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const token = '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';
  const config = {
    headers: {
      Authorization: `token ${token}`,
    },
  };

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get(`https://api.github.com/users/${username}`, config);
      setUserData(userResponse.data);
      setError('');
      fetchUserRepositories(username, 1);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('User not found. Please enter a valid username.');
      } else {
        setError('An error occurred while fetching user data.');
      }
      setUserData(null);
      setRepositories([]);
    }
  };

  const fetchUserRepositories = async (username, page) => {
    try {
      const repoResponse = await axios.get(
        `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`,
        config
      );
      if (page === 1) {
        setRepositories(repoResponse.data);
      } else {
        setRepositories(prevRepos => [...prevRepos, ...repoResponse.data]);
      }
    } catch (err) {
      setError('An error occurred while fetching user repositories.');
      setRepositories([]);
    }
  };

  const loadMoreRepositories = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUserRepositories(username, nextPage);
  };

  const clearSearch = () => {
    setUsername('');
    setUserData(null);
    setRepositories([]);
    setError('');
    setPage(1);
  };

  return (
    <div className="container">
      <h1>GitHub User Search</h1>
      <UserSearch
        username={username}
        setUsername={setUsername}
        fetchUserData={fetchUserData}
        clearSearch={clearSearch}
      />
      {error && <p className="error">{error}</p>}
      {userData && <UserProfile userData={userData} />}
      {repositories.length > 0 && (
        <RepositoryList
          repositories={repositories}
          loadMoreRepositories={loadMoreRepositories}
          perPage={perPage}
        />
      )}
    </div>
  );
};

export default App;
