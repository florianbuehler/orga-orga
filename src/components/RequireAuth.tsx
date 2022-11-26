import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onIdTokenChanged, User } from 'firebase/auth';
import AuthenticatedLayout from 'layouts/AuthenticatedLayout';
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

  return <AuthenticatedLayout />;
};

export default RequireAuth;
