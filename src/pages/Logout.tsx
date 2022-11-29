import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from 'components/firebase-config';
import UnauthenticatedLayout from 'layouts/UnauthenticatedLayout';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.log(`An error occurred during logout: ${error}`);
      });
  }, []);

  return (
    <UnauthenticatedLayout className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Logout</h1>
          <p className="py-6">You have successfully been logged out.</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Return to Login
          </button>
        </div>
      </div>
    </UnauthenticatedLayout>
  );
};

export default Logout;
