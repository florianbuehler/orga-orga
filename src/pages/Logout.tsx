import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../components/firebase-config';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Signed out successfully');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleHome = () => {
    
    navigate('/');
        
  };

  return (
    <>
      <p>You were successfully Logged out</p>
      <button onClick={handleHome}>Return to Home</button>
    </>
  );

};

export default Logout;
