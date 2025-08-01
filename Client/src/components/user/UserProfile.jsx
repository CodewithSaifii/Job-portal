import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/users/me');
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Hello, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default UserProfile;
