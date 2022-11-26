import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { onIdTokenChanged, User } from 'firebase/auth';
import { auth } from './firebase-config';

const RequireAuth: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        navigate('/login');
      } else {
        setUser(user);
      }
    });
  }, [navigate]);

  if (!user) {
    return <p>loading</p>;
  }

  console.log('user', user);

  return (
    <>
      <h1>Protected Route</h1>
      <Outlet />
    </>
  );
};

export default RequireAuth;
