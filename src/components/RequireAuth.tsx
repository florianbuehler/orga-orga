import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onIdTokenChanged, User } from 'firebase/auth';
import { auth } from 'config/firebase-config';
import AuthenticatedLayout from 'layouts/AuthenticatedLayout';

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
    return (
      <div className="min-h-screen flex">
        <aside className="w-72 bg-base-200" />
      </div>
    );
  }

  return <AuthenticatedLayout />;
};

export default RequireAuth;
