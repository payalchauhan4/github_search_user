import React from 'react';

const UserProfile = ({ userData }) => {
  return (
    <div className="user-profile">
      <img src={userData.avatar_url} alt="User Avatar" />
      <div className="user-info">
        <h2>{userData.name}</h2>
        <p>Followers: {userData.followers}</p>
        <p>Public Repositories: {userData.public_repos}</p>
        <p>Location: {userData.location}</p>
      </div>
    </div>
  );
};

export default UserProfile;
