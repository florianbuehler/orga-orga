import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoMatch: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="py-6 text-lg">Oops! We can&apos;t find that page.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoMatch;
