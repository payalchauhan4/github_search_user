import React from 'react';

const RepositoryList = ({ repositories, loadMoreRepositories, perPage }) => {
  return (
    <div className="repo-list">
      <h2>Repositories</h2>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
          </li>
        ))}
      </ul>
      {repositories.length % perPage === 0 && repositories.length >= perPage && (
        <button onClick={loadMoreRepositories}>Load More</button>
      )}
    </div>
  );
};

export default RepositoryList;
