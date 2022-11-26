import React from 'react';
import { Outlet } from 'react-router-dom';

const RequireAuth: React.FC = () => {
  return (
    <>
      <h1>Protected Route</h1>
      <Outlet />
    </>
  );
};

export default RequireAuth;
