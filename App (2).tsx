                          // Answer



import React, { useState, useEffect, useCallback } from 'react';

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// GitHub Avatar Finder App
const GitHubAvatarFinder = () => {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const debouncedUsername = useDebounce(username, 500);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${debouncedUsername}`);
        const data = await response.json();
        setAvatarUrl(data.avatar_url);
      } catch (error) {
        console.error('Error fetching user avatar:', error);
      }
    };

    if (debouncedUsername) {
      fetchUserAvatar();
    }
  }, [debouncedUsername]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={handleUsernameChange}
      />
      {avatarUrl && <img src={avatarUrl} alt="User Avatar" />}
    </div>
  );
};

export default GitHubAvatarFinder;
